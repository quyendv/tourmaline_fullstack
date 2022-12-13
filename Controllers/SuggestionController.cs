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
                Id = song["id"],
                Name = song["name"],
                Duration = song["duration"],
                Description = song["description"],
                Favorites = favorites,
                ListenTimes = song["listen_times"],
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
        var ids = await _database.Call(
            $"SELECT songid, COUNT(songid) AS favorites FROM favorites GROUP BY songid ORDER by favorites DESC LIMIT 50");
        foreach (var row in ids)
        {
            var song = (await _database.Call($"SELECT * FROM song WHERE id={row["songid"]}")).First();
            var favorites = row["favorites"];
            var tags = (await _database.Call($"SELECT * FROM songtags WHERE id={song["id"]}"))
                .Select<dynamic, string>(e => e["tag"]).ToList();
            result.Add(new Song
            {
                Id = song["id"],
                Name = song["name"],
                Duration = song["duration"],
                Description = song["description"],
                Favorites = favorites,
                ListenTimes = song["listen_times"],
                Tags = tags,
                Uploader = song["uploader"],
                UploadTime = song["uploadTime"]
            });
        }

        return result;
    }
}