using tourmaline.Models;

namespace tourmaline.Services;

public class RecentServices
{
    private readonly Database _database;

    public RecentServices(Database database)
    {
        _database = database;
    }

    public async Task<List<Song>> GetRecent(string username)
    {
        var songServices = new SongServices(_database);
        var result = (await _database.Call($"SELECT song FROM recents WHERE username='{username}' SORT BY added_date")).Select(e => e["song"]);
        var songs = new List<Song>();
        foreach (var song in result)
        {
            songs.Add(await songServices.GetSong(song));
        }

        return songs;
    } 
    
    public async Task AddRecent(string username, int id)
    {
        await _database.Call($"INSERT INTO recents (username, song, added_date) " +
                             $"VALUES ('{username}', {id}, '{DateTime.Now:yyyy-MM-dd H:mm:ss}') " +
                             $"ON DUPLICATE KEY UPDATE added_date='{DateTime.Now:yyyy-MM-dd H:mm:ss}'");
    }
}