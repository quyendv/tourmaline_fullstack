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
        var result = await _connection.Read("song", new Dictionary<string, dynamic>() { { "id", id } });
        if (result.Count == 0) return StatusCode(StatusCodes.Status404NotFound, "Song not found!");
        var song = new Song
        {
            Id = result.First()["id"],
            Description = result.First()["description"],
            Name = result.First()["name"],
            Uploader = result.First()["uploader"],
            UploadTime = result.First()["uploadTime"],
            Duration = result.First()["duration"]
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
            string songPath = songObjects[0]["path"];

            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            var file = new FileStream($"{homeDir}/storage/media/{songPath}", FileMode.Open, FileAccess.Read,
                FileShare.None, 2048,
                true);

            await _connection.Add("recents", new Dictionary<string, dynamic>()
            {
                { "username", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value },
                { "song", id },
                { "added_date", DateTime.Now.ToString("yyyy-MM-dd H:mm:ss") }
            });
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
        string coverPath = songObjects[0]["coverUrl"];

        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/cover/{coverPath}", FileMode.Open, FileAccess.Read,
            FileShare.None, 2048,
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

        TimeSpan duration = TimeSpan.Zero;

        try
        {
            duration = (await FFProbe.AnalyseAsync(filePath)).Duration;
        } catch (Exception ex)
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

        if (isSongExist)
        {
            // Check song ownership
            if (!CanCurrentUserModifySong(queryResult[0]["uploader"]))
                return StatusCode(StatusCodes.Status403Forbidden,
                    "The current user does not have the required permission to delete the song!");

            var toDictionary = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(info.ToJson())!;
            toDictionary.Remove("id");
            var result = await _connection.Update(
                "song",
                toDictionary,
                new Dictionary<string, dynamic>()
                {
                    { "id", info.Id }
                }
            );
            return result ? Ok() : StatusCode(StatusCodes.Status500InternalServerError);
        }
        else
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        }
    }

    [HttpDelete]
    [Route("delete")]
    public async Task<ActionResult> DeleteSong(string id)
    {
        var idConditions = new Dictionary<string, dynamic>() { { "id", long.Parse(id) } };
        var songObjects = await _connection.Read("song", idConditions);
        var isSongExist = songObjects.Count != 0;

        if (!isSongExist)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found to delete!");
        }
        else
        {
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