using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline_asp.net.Controllers;

[ApiController]
[Authorize]
public class SongController : ControllerBase
{
    private readonly DbConnection _connection;

    public SongController(DbConnection connection)
    {
        _connection = connection;
    }

    [HttpGet]
    [Route("api/[controller]/get")]
    public async Task<ActionResult<Song>> GetSongInfo(int id)
    {
        var result = await _connection.Read("song", new Dictionary<string, dynamic>() { { "id", id } });
        if (result.Count != 0)
        {
            var song = new Song
            {
                Id = result.First()["id"],
                Album = result.First()["album"],
                CoverUrl = result.First()["coverUrl"],
                Description = result.First()["description"],
                Lyrics = result.First()["lyrics"],
                Name = result.First()["name"],
                Path = result.First()["path"],
                Uploader = result.First()["uploader"],
                UploadTime = result.First()["uploadTime"]
            };
            return Ok(song);
        }

        return StatusCode(StatusCodes.Status404NotFound, "Song not found!");
    }

    [HttpGet]
    [Route("api/[controller]/getMedia")]
    public Task<ActionResult> DownloadSong(string path)
    {
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/{path}", FileMode.Open, FileAccess.Read, FileShare.None, 2048,
            true);

        return Task.FromResult<ActionResult>(File(file, "audio/mpeg"));
    }

    [HttpPost("FileUpload")]
    [Route("api/[controller]/upload")]
    public async Task<ActionResult> UploadSong(IFormFile file, string name, string username)
    {
        if (file.Length > 0)
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/");
            var id = new Random().Next();
            var fileName = $"{id}.mp3";
            var filePath = Path.Combine($"{homeDir}/storage/", fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var song = new Song
            {
                Id = id,
                Name = name,
                Uploader = username,
                UploadTime = DateTime.Now,
                Path = fileName
            };
            await _connection.Add("song", new Dictionary<string, dynamic>
            {
                { "id", song.Id },
                { "uploadTime", song.UploadTime.ToString("yyyy-MM-dd H:mm:ss") },
                { "uploader", song.Uploader },
                { "name", song.Name },
                { "coverUrl", song.CoverUrl },
                { "lyrics", song.Lyrics },
                { "description", song.Description },
                { "album", song.Album },
                { "path", song.Path }
            });
            return Ok("Upload succeeded!");
        }

        return StatusCode(StatusCodes.Status406NotAcceptable);
    }

    [HttpPut]
    [Route("api/[controller]/edit")]
    public async Task<ActionResult> EditSong(string id, IDictionary<string, dynamic> infos)
    {
        var idConds = new Dictionary<string, dynamic>() { { "id", Int64.Parse(id) } };
        var isSongExist = (await _connection.Read("song", idConds)).Count !=
                          0;
        if (isSongExist)
        {
            var result = await _connection.Update("song", infos, idConds);
            if (result)
            {
                return Ok();
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        else
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        }
    }

    [HttpDelete]
    [Route("api/[controller]/delete")]
    public async Task<ActionResult> DeleteSong(string id)
    {
        var idConditions = new Dictionary<string, dynamic>() { { "id", Int64.Parse(id) } };
        var isSongExist = (await _connection.Read("song", idConditions)).Count !=
                          0;

        if (!isSongExist)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found to delete!");
        } else
        {
            var result = await _connection.Delete("song", idConditions);
            if (result)
            {
                return Ok();
            } 
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}