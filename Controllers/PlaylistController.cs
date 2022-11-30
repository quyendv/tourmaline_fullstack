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
            UserName = result.First()["user"],
            Name = result.First()["name"],
            Cover = result.First()["cover_url"]
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
                Album = songQuery["album"],
                Description = songQuery["description"],
                Lyrics = songQuery["lyrics"],
                Name = songQuery["name"],
                UploadTime = songQuery["uploadTime"],
                Uploader = songQuery["uploader"]
            });
        }

        return Ok(playlist);
    }

    [Route("create")]
    [HttpPost]
    public async Task<ActionResult<Playlist>> CreatePlaylist([FromForm] string name, [FromForm] IFormFile? cover)
    {
        var playlist = new Playlist
        {
            Id = new Random().Next(),
            Name = name,
            UserName = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value,
        };

        if (cover != null)
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/cover");
            var fileName = $"{playlist.Id}.jpg";
            var filePath = Path.Combine($"{homeDir}/storage/cover", fileName);
            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await cover.CopyToAsync(stream);
            }

            playlist.Cover = fileName;
        }

        await _database.Add("playlist", new Dictionary<string, dynamic>()
        {
            { "id", playlist.Id },
            { "name", playlist.Name },
            { "user", playlist.UserName },
            { "cover_url", playlist.Cover }
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
            { "username", HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value }
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
        await _database.Add("playlistsongs", new Dictionary<string, dynamic>()
        {
            { "songId", songId },
            { "playlistId", playlistId }
        });
        return Ok();
    }

    [Route("remove")]
    [HttpDelete]
    public async Task<ActionResult> RemoveFromPlaylist(int songId, int playlistId)
    {
        var isSongExist =
            (await _database.Read("song", new Dictionary<string, dynamic>() { { "id", songId } })).Count != 0;
        if (!isSongExist) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        var isPlaylistExist =
            (await _database.Read("playlist", new Dictionary<string, dynamic>() { { "id", playlistId } })).Count != 0;
        if (!isPlaylistExist) return StatusCode(StatusCodes.Status400BadRequest, "Playlist not found!");
        await _database.Delete("playlistsongs", new Dictionary<string, dynamic>()
        {
            { "songId", songId },
            { "playlistId", playlistId }
        });
        return Ok();
    }
}