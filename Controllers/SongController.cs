using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Newtonsoft.Json;
using NuGet.Protocol;
using tourmaline.Models;
using tourmaline.Services;
using FFMpegCore;

namespace tourmaline.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class SongController : ControllerBase
{
    private readonly Database _connection;

    public SongController(Database connection)
    {
        _connection = connection;
    }

    private bool CanCurrentUserModifySong(string songOwnerName)
    {
        var isAdminClaim = HttpContext.User.FindFirst(UserController.IsAdminClaimName);
        if (isAdminClaim != null && bool.Parse(isAdminClaim.Value)) return true;

        return songOwnerName == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
    }

    private string CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";

    [HttpGet]
    [Route("get")]
    public async Task<ActionResult<Song>> GetSongInfo(int id)
    {
        var infos = await _connection.Read("song", new Dictionary<string, dynamic>() { { "id", id } });
        if (infos.Count == 0) return StatusCode(StatusCodes.Status404NotFound, "Song not found!");
        var tags = (await _connection.Read("songtags", new Dictionary<string, dynamic>() { { "id", id } })).Select((e) => e["tag"]);
        var song = new Song
        {
            Id = infos.First()["id"],
            Description = infos.First()["description"],
            Name = infos.First()["name"],
            Uploader = infos.First()["uploader"],
            UploadTime = infos.First()["uploadTime"],
            Duration = infos.First()["duration"],
            Tags = tags.Cast<string>().ToList(),
        };
        return Ok(song);
    }

    [HttpGet]
    [Route("getMedia")]
    public async Task<ActionResult> GetMedia(long id)
    {
        var idConds = new Dictionary<string, dynamic>() { { "id", id } };
        var songObjects = await _connection.Read("song", idConds);
        var isSongExist = songObjects.Count != 0;

        if (isSongExist)
        {
            string songPath = $"{id}.mp3";

            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            var file = new FileStream($"{homeDir}/storage/media/{songPath}", FileMode.Open, FileAccess.Read,
                FileShare.ReadWrite, 2048,
                true);

            try
            {
                await _connection.Add("recents", new Dictionary<string, dynamic>()
                {
                    { "username", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value },
                    { "song", id },
                    { "added_date", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss") }
                });
            }
            catch
            {
                await _connection.Update("recent", new Dictionary<string, dynamic>()
                {
                    { "added_date", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss") },
                }, new Dictionary<string, dynamic>()
                {
                    { "username", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value },
                    { "song", id }
                });
            }

            return File(file, "audio/mpeg", true);
        }
        else
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        }
    }

    [HttpGet]
    [Route("getCover")]
    public async Task<ActionResult> GetCover(long id)
    {
        var idConds = new Dictionary<string, dynamic>() { { "id", id } };
        var songObjects = await _connection.Read("song", idConds);
        var isSongExist = songObjects.Count != 0;

        if (!isSongExist) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        string coverPath = $"{id}.jpg";

        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/cover/{coverPath}", FileMode.Open, FileAccess.Read,
            FileShare.Read, 2048,
            true);

        return File(file, "image/jpeg", true);
    }

    [HttpPost("FileUpload")]
    [Route("upload")]
    [DataType("multipart/formdata")]
    public async Task<ActionResult> UploadSong([FromForm] IFormFile media, [FromForm] IFormFile cover,
        [FromForm] string name)
    {
        if (media.Length <= 0 || cover.Length <= 0) return StatusCode(StatusCodes.Status406NotAcceptable);
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        Directory.CreateDirectory($"{homeDir}/storage/media");
        Directory.CreateDirectory($"{homeDir}/storage/cover");
        var id = new Random().Next();
        var fileName = $"{id}.mp3";
        var filePath = Path.Combine($"{homeDir}/storage/media", fileName);
        var imageName = $"{id}.jpg";
        var imagePath = Path.Combine($"{homeDir}/storage/cover", imageName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await media.CopyToAsync(stream);
        }

        await using (var stream = new FileStream(imagePath, FileMode.Create))
        {
            await cover.CopyToAsync(stream);
        }

        var duration = TimeSpan.Zero;

        try
        {
            duration = (await FFProbe.AnalyseAsync(filePath)).Duration;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }

        name = name.Replace("'", "\'");
        name = name.Replace("\"", "\"");

        await _connection.Add("song", new Dictionary<string, dynamic>
        {
            { "id", id },
            { "uploadTime", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss") },
            { "uploader", CurrentSessionUsername },
            { "name", name },
            { "description", "" },
            { "duration", duration.TotalSeconds }
        });
        
        // var songTags = new List<string>()
        // {
        //     "Lofi",
        //     "Future House",
        //     "Dubstep",
        //     "Hiphop",
        //     "Rap",
        //     "Electronic",
        //     "Funk",
        //     "Synthwave",
        //     "Dance & EDM",
        // };
        // var random = new List<string>();
        // for (var i = 0; i < new Random().Next(1, 3); i++)
        // {
        //     random.Add(songTags[new Random().Next(0, songTags.Count - 1)]);
        // }
        // foreach (var tag in random)
        // {
        //     var isTagExist = (await _connection.Read("tags", new Dictionary<string, dynamic>()
        //     {
        //         { "tag", tag }
        //     })).Count != 0;
        //     if (!isTagExist)
        //     {
        //         await _connection.Add("tags", new Dictionary<string, dynamic>()
        //         {
        //             { "tag", tag }
        //         });
        //     }
        //     await _connection.Add("songtags", new Dictionary<string, dynamic>()
        //     {
        //         {"id", id},
        //         {"tag", tag}
        //     });
        // }
        
        return Ok("Upload succeeded!");
    }

    [HttpPut]
    [Route("edit")]
    public async Task<ActionResult> EditSong([FromBody] Song info)
    {
        var queryResult = await _connection.Read("song", new Dictionary<string, dynamic>()
        {
            { "id", info.Id }
        });
        var isSongExist = queryResult.Count != 0;

        if (!isSongExist) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        // Check song ownership
        if (!CanCurrentUserModifySong(queryResult[0]["uploader"]))
            return StatusCode(StatusCodes.Status403Forbidden,
                "The current user does not have the required permission to delete the song!");

        var toDictionary = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(info.ToJson())!;
        toDictionary.Remove("id");
        var songTags = info.Tags;
        toDictionary.Remove("tags");
        await _connection.Update(
            "song",
            toDictionary,
            new Dictionary<string, dynamic>()
            {
                { "id", info.Id }
            }
        );
        await _connection.Delete("songtags", new Dictionary<string, dynamic>()
        {
            { "id", info.Id }
        });
        foreach (var tag in songTags)
        {
            var isTagExist = (await _connection.Read("tags", new Dictionary<string, dynamic>()
            {
                { "tag", tag }
            })).Count != 0;
            if (!isTagExist)
            {
                await _connection.Add("tags", new Dictionary<string, dynamic>()
                {
                    { "tag", tag }
                });
            }
            await _connection.Add("songtags", new Dictionary<string, dynamic>()
            {
                {"id", info.Id},
                {"tag", tag}
            });
        }
        return Ok();

    }

    [HttpDelete]
    [Route("delete")]
    public async Task<ActionResult> DeleteSong(long id)
    {
        var idConditions = new Dictionary<string, dynamic>() { { "id", id } };
        var songObjects = await _connection.Read("song", idConditions);
        var isSongExist = songObjects.Count != 0;

        if (!isSongExist)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found to delete!");
        }

        // Check song ownership
        if (!CanCurrentUserModifySong(songObjects[0]["uploader"]))
            return StatusCode(StatusCodes.Status403Forbidden,
                "The current user does not have the required permission to delete the song!");

        var result = await _connection.Delete("song", idConditions);
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        System.IO.File.Delete($"{homeDir}/storage/media/{id}.mp3");
        System.IO.File.Delete($"{homeDir}/storage/cover/{id}.jpg");
        return result ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("getUploaded")]
    public async Task<JsonResult> GetSongs(string username)
    {
        var userNameMatchCond = new Dictionary<string, dynamic>() { { "username", username } };
        var doesUserExist = (await _connection.Read("user", userNameMatchCond)).Count != 0;

        if (!doesUserExist)
        {
            return new JsonResult("User not found!")
            {
                StatusCode = StatusCodes.Status406NotAcceptable
            };
        }

        var songsInfo = await _connection.Read("song", new Dictionary<string, dynamic>() { { "uploader", username } },
            new List<string>()
            {
                "id",
                "uploadTime",
                "name",
                "description",
                "duration"
            });

        return new JsonResult(songsInfo);
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("find")]
    public async Task<JsonResult> FindSongs(string keyword)
    {
        return new JsonResult(await _connection.CallFindProcedure("FindSongs", keyword));
    }
}