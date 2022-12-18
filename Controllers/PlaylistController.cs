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
    public PlaylistController(PlaylistServices playlistServices, UserServices userServices, SongServices songServices)
    {
        _playlistServices = playlistServices;
        _userServices = userServices;
        _songServices = songServices;
    }

    private readonly PlaylistServices _playlistServices;
    private readonly SongServices _songServices;
    private readonly UserServices _userServices;

    private string CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

    [Route("get")]
    [HttpGet]
    public async Task<ActionResult<Playlist>> GetPlaylist(int id)
    {
        if (!await _playlistServices.IsPlaylistExist(id))
        {
            return StatusCode(StatusCodes.Status404NotFound, "Playlist not found");
        }

        return Ok(await _playlistServices.GetPlaylist(id));
    }

    [Route("getCover")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult> GetCover(int id)
    {
        if (!await _playlistServices.IsPlaylistExist(id))
            return StatusCode(StatusCodes.Status400BadRequest, "Playlist not found!");

        var fileName = $"{id}.png";
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        try
        {
            var file = new FileStream($"{homeDir}/storage/playlist/{fileName}", FileMode.Open, FileAccess.Read,
                FileShare.ReadWrite, 2048,
                true);

            return File(file, "image/jpeg", true);
        }
        catch (Exception e)
        {
            var file = new FileStream($"Assets/defaultPlaylist.png", FileMode.Open, FileAccess.Read,
                FileShare.ReadWrite, 2048,
                true);

            return File(file, "image/jpeg", true);
        }
    }

    [HttpPost]
    [Route("setCover")]
    public async Task<ActionResult> SetAvatar([FromForm] int id, [FromForm] IFormFile file)
    {
        try
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/playlist");
            var fileName = $"{id}.png";
            var filePath = Path.Combine($"{homeDir}/storage/playlist", fileName);
            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);
            return Ok("Upload success!");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return StatusCode(StatusCodes.Status500InternalServerError);
    }
    
    [Route("create")]
    [HttpPost]
    public async Task<ActionResult<Playlist>> CreatePlaylist([FromForm] string name, [FromForm] string? description,
        [FromForm] IFormFile? cover)
    {
        var playlist = new Playlist(id: new Random().Next())
        {
            Name = name,
            Username = CurrentSessionUsername,
            Description = description ?? "",
        };

        var fileName = $"{playlist.Id}.jpg";
        if (cover != null)
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/cover");
            var filePath = Path.Combine($"{homeDir}/storage/cover", fileName);
            await using var stream = new FileStream(filePath, FileMode.Create);
            await cover.CopyToAsync(stream);
        }

        await _playlistServices.AddPlaylist(playlist);
        return Ok(playlist);
    }

    [Route("delete")]
    [HttpDelete]
    public async Task<ActionResult> DeletePlaylist(int id)
    {
        if (!await _playlistServices.IsPlaylistExist(id))
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Playlist does not exist!");
        }

        if (!await _userServices.IsAdmin(CurrentSessionUsername) && CurrentSessionUsername !=
            (await _playlistServices.GetPlaylist(id)).Username) return StatusCode(StatusCodes.Status403Forbidden);
        
        await _playlistServices.DeletePlaylist(id);
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        try
        {
            System.IO.File.Delete($"{homeDir}/storage/playlist/{id}.png");
        }
        catch (Exception _)
        {
            // ignored
        }

        return Ok();
    }

    [Route("add")]
    [HttpPut]
    public async Task<ActionResult> AddToPlaylist(int songId, int playlistId)
    {
        if (!await _songServices.IsSongExist(songId)) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        if (!await _playlistServices.IsPlaylistExist(playlistId)) return StatusCode(StatusCodes.Status400BadRequest, "Playlist not found!");
        await _playlistServices.AddSong(playlistId, songId);
        return Ok();
    }

    [Route("remove")]
    [HttpDelete]
    public async Task<ActionResult> RemoveFromPlaylist(int songId, int playlistId)
    {
        if (!await _playlistServices.IsPlaylistExist(playlistId))
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Playlist not found!");
        }

        if (!await _songServices.IsSongExist(songId))
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        }

        await _playlistServices.RemoveSong(playlistId, songId);
        return Ok();
    }

    [Route("playlists")]
    [HttpGet]
    public async Task<ActionResult<UserPlaylist>> GetAllPlaylist()
    {
        return Ok(await _playlistServices.GetUserPlaylists(CurrentSessionUsername));
    }
}