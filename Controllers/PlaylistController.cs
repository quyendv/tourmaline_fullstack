using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PlaylistController : ControllerBase
{
    private readonly Database _database;

    public PlaylistController(Database database)
    {
        _database = database;
    }

    private string Username => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

    [Route("get")]
    [HttpGet]
    public async Task<ActionResult<Playlist>> GetPlaylist(int id)
    {
        var result = await _database.Read("playlist", new Dictionary<string, dynamic>()
        {
            { "id", id }
        });
        if (result.Count == 0) return StatusCode(StatusCodes.Status404NotFound, "Playlist not found");

        var playlist = new Playlist
        {
            Id = result.First()["id"],
            Username = result.First()["user"],
            Name = result.First()["name"],
        };
        var songs = await _database.Read("playlistsongs", new Dictionary<string, dynamic>()
        {
            { "playlistId", playlist.Id }
        }, new List<string>() { "songId" });

        foreach (var songId in songs.Select(s => s["songId"]))
        {
            var songQuery = (await _database.Read("song", new Dictionary<string, dynamic>()
            {
                { "id", songId }
            })).First();
            playlist.Songs.Add(new Song
            {
                Id = songId,
                Description = songQuery["description"],
                Name = songQuery["name"],
                UploadTime = songQuery["uploadTime"],
                Uploader = songQuery["uploader"]
            });
        }

        return Ok(playlist);
    }

    [Route("getCover")]
    [HttpGet]
    public async Task<ActionResult> GetCover(int id)
    {
        var idConds = new Dictionary<string, dynamic>() { { "id", id } };
        var query = await _database.Read("playlist", idConds);
        var isPlaylistExist = query.Count != 0;

        if (!isPlaylistExist) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        string coverPath = query[0]["cover_url"];

        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/cover/{coverPath}", FileMode.Open, FileAccess.Read,
            FileShare.None, 2048,
            true);

        return File(file, "image/jpeg", true);
    }

    [Route("create")]
    [HttpPost]
    public async Task<ActionResult<Playlist>> CreatePlaylist([FromForm] string name, [FromForm] IFormFile? cover)
    {
        var playlist = new Playlist
        {
            Id = new Random().Next(),
            Name = name,
            Username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value,
        };
        
        var fileName = $"{playlist.Id}.jpg";
        if (cover != null)
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/cover");
            var filePath = Path.Combine($"{homeDir}/storage/cover", fileName);
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await cover.CopyToAsync(stream);
            }
        }

        await _database.Add("playlist", new Dictionary<string, dynamic>()
        {
            { "id", playlist.Id },
            { "name", playlist.Name },
            { "user", playlist.Username },
            { "cover_url", fileName }
        });
        return Ok(playlist);
    }

    [Route("delete")]
    [HttpDelete]
    public async Task<ActionResult> DeletePlaylist(int id)
    {
        var isPlaylistExist = (await _database.Read("playlist", new Dictionary<string, dynamic>()
        {
            { "user", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value },
            { "id", id }
        })).Count != 0;
        if (!isPlaylistExist) return StatusCode(StatusCodes.Status400BadRequest, "Playlist does not exist!");
        await _database.Delete("playlist", new Dictionary<string, dynamic>()
        {
            { "id", id },
            { "user", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value }
        });
        return Ok();
    }

    [Route("add")]
    [HttpPut]
    public async Task<ActionResult> AddToPlaylist(int songId, int playlistId)
    {
        var isSongExist =
            (await _database.Read("song", new Dictionary<string, dynamic>() { { "id", songId } })).Count != 0;
        if (!isSongExist) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        var isPlaylistExist =
            (await _database.Read("playlist", new Dictionary<string, dynamic>() { { "id", playlistId } })).Count != 0;
        if (!isPlaylistExist) return StatusCode(StatusCodes.Status400BadRequest, "Playlist not found!");
        var result = await _database.Add("playlistsongs", new Dictionary<string, dynamic>()
        {
            { "songId", songId },
            { "playlistId", playlistId }
        });
        return result ? Ok() : StatusCode(StatusCodes.Status409Conflict, "Song is already added!");
    }

    [Route("remove")]
    [HttpDelete]
    public async Task<ActionResult> RemoveFromPlaylist([FromBody] int[] songIds, int playlistId)
    {
        foreach (var songId in songIds)
        {
            var isSongExist =
                (await _database.Read("song", new Dictionary<string, dynamic>() { { "id", songId } })).Count != 0;
            var isPlaylistExist =
                (await _database.Read("playlist", new Dictionary<string, dynamic>() { { "id", playlistId } })).Count != 0;
            if (isSongExist && isPlaylistExist)
            {
                await _database.Delete("playlistsongs", new Dictionary<string, dynamic>()
                {
                    { "songId", songId },
                    { "playlistId", playlistId }
                });
            }
        }
        return Ok();
    }

    [Route("playlists")]
    [HttpGet]
    public async Task<ActionResult<UserPlaylist>> GetAllPlaylist()
    {
        var userPlaylist = new UserPlaylist();
        var result = await _database.Read("playlist", new Dictionary<string, dynamic>()
        {
            { "user", Username}
        });
        foreach (var playlist in result.Select(pl => new Playlist
                 {
                     Id = pl["id"],
                     Name = pl["name"],
                     Username = Username,
                 }))
        {
            var songs = await _database.Read("playlistsongs", new Dictionary<string, dynamic>()
            {
                { "playlistId", playlist.Id }
            });
            foreach (var s in songs)
            {
                var tags = (await _database.Read("songtags", new Dictionary<string, dynamic>()
                {
                    { "id", s["id"] }
                })).Select((e) => e["tag"].ToString()).Cast<string>().ToList();
                var song = new Song
                {
                    Name = s["name"],
                    Uploader = s["uploader"],
                    Id = s["id"],
                    UploadTime = DateTime.Parse(s["uploadTime"]),
                    Description = s["description"],
                    Tags = tags,
                };
                playlist.Songs.Add(song);
            }
            userPlaylist.Playlists.Add(playlist);
        }

        return Ok(userPlaylist);
    }
}