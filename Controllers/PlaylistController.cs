using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Authorize]
[ApiController]
public class PlaylistController : ControllerBase
{
    private readonly DbConnection _database;

    public PlaylistController(DbConnection database)
    {
        _database = database;
    }

    [Route("api/[controller]/get")]
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
            Name = result.First()["name"]
        };
        var songs = await _database.Read("playlistsongs", new Dictionary<string, dynamic>()
        {
            { "playlistId", playlist.Id }
        }, new List<string>() { "songId" });

        foreach (var s in songs)
        {
            var songId = s["songId"];
            var songQuery = (await _database.Read("song", new Dictionary<string, dynamic>()
            {
                { "id", songId }
            })).First();
            playlist.Songs.Add(new Song
            {
                Id = songId,
                Album = songQuery["album"],
                CoverUrl = songQuery["coverUrl"],
                Description = songQuery["description"],
                Lyrics = songQuery["lyrics"],
                Name = songQuery["name"],
                Path = songQuery["path"],
                UploadTime = songQuery["uploadTime"],
                Uploader = songQuery["uploader"]
            });
        }

        return Ok(playlist);
    }

    [Route("api/[controller]/create")]
    [HttpPost]
    public async Task<ActionResult<Playlist>> CreatePlaylist(string name)
    {
        var playlist = new Playlist
        {
            Id = new Random().Next(),
            Name = name,
            UserName = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        };
        await _database.Add("playlist", new Dictionary<string, dynamic>()
        {
            { "id", playlist.Id },
            { "name", playlist.Name },
            { "user", playlist.UserName }
        });
        return Ok(playlist);
    }

    [Route("api/[controller]/delete")]
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

    [Route("api/[controller]/add")]
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

    [Route("api/[controller]/remove")]
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