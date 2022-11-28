using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Authorize]
[ApiController]
public class RecentController : ControllerBase
{
    public RecentController(DbConnection dbConnection)
    {
        _database = dbConnection;
    }

    private DbConnection _database;

    [Route("api/[controller]/recents")]
    public async Task<ActionResult<Recents>> GetRecentSongs()
    {
        var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        var songIDs = await _database.Read("recents", new Dictionary<string, dynamic>() { { "username", username } },
            new List<string>() { "song" }, "added_date");
        var recents = new Recents();
        var songController = new SongController(_database);
        foreach (int song in songIDs.First()["song"])
        {
            var result = (await songController.GetSongInfo(song)).Value!;
            recents.RecentSongs.Add(result);
        }

        return Ok(recents);
    }
}