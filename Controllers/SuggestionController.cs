using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class SuggestionController : ControllerBase
{
    public SuggestionController(Database database)
    {
        _database = database;
    }

    private readonly Database _database;

    [Route("get")]
    [HttpGet]
    public async Task<ActionResult<Suggestion>> GetSuggestion()
    {
        var suggestion = new Suggestion
        {
            RecentlyPlayed = await GetRecentlyPlayed(),
            RecentlyUploaded = await GetRecentlyUploaded(),
            Top50 = await GetTop50()
        };
        return Ok(suggestion);
    }

    private string Username => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

    private async Task<List<Song>> GetRecentlyUploaded()
    {
        var result = new List<Song>();
        var queryResult = await _database.Call("SELECT * FROM song ORDER BY uploadTime DESC LIMIT 15");
        foreach (var r in queryResult)
        {
            var favorites = (await _database.Call($"SELECT * FROM favorites WHERE songid={r["id"]}")).Count;
            var tags = (await _database.Call($"SELECT * FROM songtags WHERE id={r["id"]}"))
                .Select<dynamic, string>(e => e["tag"]).ToList();
            result.Add(new Song
            {
                Id = r["id"],
                Name = r["name"],
                Duration = r["duration"],
                Description = r["description"],
                Favorites = favorites,
                ListenTimes = r["listen_times"],
                Tags = tags,
                Uploader = r["uploader"],
                UploadTime = r["uploadTime"]
            });
        }

        return result;
    }

    private async Task<List<Song>> GetRecentlyPlayed()
    {
        var result = new List<Song>();
        var ids = (await _database.Call(
                $"SELECT song FROM recents WHERE username='{Username}' ORDER BY added_date DESC LIMIT 15"))
            .Select<dynamic, int>(e => e["song"]);
        foreach (var id in ids)
        {
            var song = (await _database.Call($"SELECT * FROM song WHERE id={id}")).First();
            var favorites = (await _database.Call($"SELECT * FROM favorites WHERE songid={song["id"]}")).Count;
            var tags = (await _database.Call($"SELECT * FROM songtags WHERE id={song["id"]}"))
                .Select<dynamic, string>(e => e["tag"]).ToList();
            result.Add(new Song
            {
                Id = (int)song["id"],
                Name = song["name"],
                Duration = song["duration"],
                Description = song["description"],
                Favorites = favorites,
                ListenTimes = (int)song["listen_times"],
                Tags = tags,
                Uploader = song["uploader"],
                UploadTime = song["uploadTime"]
            });
        }

        return result;
    }

    private async Task<List<Song>> GetTop50()
    {
        var result = new List<Song>();
        var songs = await _database.Call(
            $@"SELECT favorites.songid AS songid, song.name, song.duration, song.description, COUNT(favorites.songid) AS favorites,
            song.listen_times, GROUP_CONCAT(songtags.tag SEPARATOR ';') as tags, song.uploader, song.uploadTime FROM favorites 
            INNER JOIN song ON song.id = songid
            LEFT JOIN songtags ON songtags.id = songid
            GROUP BY songid ORDER by favorites DESC LIMIT 50");
        foreach (var songInfo in songs)
        {
            result.Add(new Song
            {
                Id = (int)songInfo["songid"],
                Name = songInfo["name"],
                Duration = songInfo["duration"],
                Description = songInfo["description"],
                Favorites = (int)songInfo["favorites"],
                ListenTimes = (int)songInfo["listen_times"],
                Tags = (songInfo["tags"] is DBNull) ? new List<string>() :
                    ((string)songInfo["tags"]).Split(';').ToList(),
                Uploader = songInfo["uploader"],
                UploadTime = songInfo["uploadTime"]
            });
        }

        return result;
    }
}