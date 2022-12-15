using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using tourmaline.Models;
using tourmaline.Services;
using FFMpegCore;
using tourmaline.Helpers;

namespace tourmaline.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class SongController : ControllerBase
{
    private readonly SongServices _songServices;
    private readonly UserServices _userServices;
    private readonly RecentServices _recentServices;

    public SongController(SongServices songServices, UserServices userServices, RecentServices recentServices)
    {
        _songServices = songServices;
        _userServices = userServices;
        _recentServices = recentServices;
    }

    private string? CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [HttpGet]
    [Route("get")]
    public async Task<ActionResult<Song>> GetSongInfo(int id)
    {
        if (!await _songServices.IsSongExist(id))
        {
            return StatusCode(StatusCodes.Status404NotFound);
        }

        return Ok(await _songServices.GetSong(id));
    }

    [HttpGet]
    [Route("getMedia")]
    [AllowAnonymous]
    public async Task<ActionResult> GetMedia(int id)
    {
        if (!await _songServices.IsSongExist(id)) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        var songPath = $"{id}.mp3";
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/song/media/{songPath}", FileMode.Open, FileAccess.Read,
            FileShare.ReadWrite, 2048,
            true);

        await _songServices.AddListenTime(id);

        if (CurrentSessionUsername != null)
        {
            await _recentServices.AddRecent(CurrentSessionUsername, id);
        }

        return File(file, "audio/mpeg", true);
    }

    [HttpGet]
    [Route("getCover")]
    [AllowAnonymous]
    public async Task<ActionResult> GetCover(int id)
    {
        if (!await _songServices.IsSongExist(id)) return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");

        var coverPath = $"{id}.png";
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var file = new FileStream($"{homeDir}/storage/song/cover/{coverPath}", FileMode.Open, FileAccess.Read,
            FileShare.Read, 2048,
            true);

        return File(file, "image/png", true);
    }

    [HttpPost("FileUpload")]
    [Route("upload")]
    [DataType("multipart/formdata")]
    public async Task<ActionResult> UploadSong([FromForm] IFormFile media, [FromForm] IFormFile cover,
        [FromForm] string name, [FromForm] string? description, [FromForm] string? tags)
    {
        if (media.Length <= 0 || cover.Length <= 0) return StatusCode(StatusCodes.Status406NotAcceptable);
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        Directory.CreateDirectory($"{homeDir}/storage/song/media");
        Directory.CreateDirectory($"{homeDir}/storage/song/cover");
        var id = new Random().Next();
        var fileName = $"{id}.mp3";
        var filePath = Path.Combine($"{homeDir}/storage/song/media", fileName);
        var imageName = $"{id}.png";
        var imagePath = Path.Combine($"{homeDir}/storage/song/cover", imageName);

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
        // songTags.Shuffle();
        // var tags = songTags.Take(new Random().Next(1, 9)).ToList();
        await _songServices.AddSong(new Song
        {
            Id = id,
            Name = name,
            Duration = duration.TotalSeconds,
            Uploader = CurrentSessionUsername!,
            UploadTime = DateTime.Now,
            Description = description ?? "",
            Tags = tags?.Split(";").Select(e => e.Trim()).ToList() ?? new List<string>(),
        });

        return Ok("Upload succeeded!");
    }

    [HttpPut]
    [Route("edit")]
    public async Task<ActionResult> EditSong(int id, string? name, string? description, string? tags)
    {
        if (!await _songServices.IsSongExist(id))
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        var song = await _songServices.GetSong(id);
        if (!await _userServices.IsAdmin(CurrentSessionUsername!) && CurrentSessionUsername != song.Uploader)
            return StatusCode(StatusCodes.Status403Forbidden);
        await _songServices.UpdateInfo(id: id, name: name, description: description, tags: tags?.Split(";").Select(e => e.Trim()).ToList());
        return Ok();
    }

    [HttpDelete]
    [Route("delete")]
    public async Task<ActionResult> DeleteSong(int id)
    {
        if (!await _songServices.IsSongExist(id))
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Song not found!");
        }

        if (!await _userServices.IsAdmin(CurrentSessionUsername!) && CurrentSessionUsername !=
            (await _songServices.GetSong(id)).Uploader)
        {
            return StatusCode(StatusCodes.Status403Forbidden);
        }

        await _songServices.DeleteSong(id);
        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        System.IO.File.Delete($"{homeDir}/storage/song/media/{id}.mp3");
        System.IO.File.Delete($"{homeDir}/storage/song/cover/{id}.png");
        return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("getUploaded")]
    public async Task<ActionResult<UserUploads>> GetSongs(string username)
    {
        if (!await _userServices.IsUserExist(username))
        {
            return StatusCode(StatusCodes.Status404NotFound, "User doesn't exist!");
        }

        return Ok(await _songServices.GetUserUploads(username));
    }

    // [HttpGet]
    // [AllowAnonymous]
    // [Route("find")]
    // public async Task<JsonResult> FindSongs(string keyword)
    // {
    //     return new JsonResult(await _connection.CallFindProcedure("FindSongs", keyword));
    // }
}