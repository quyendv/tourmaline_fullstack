using tourmaline.Models;

namespace tourmaline.Services;

public class FavoriteServices
{
    private readonly Database _database;

    public FavoriteServices(Database database)
    {
        _database = database;
    }
    
    public async Task AddToFavorite(string username, int id)
    {
        await _database.Call($"INSERT INTO favorites (userid, songid) VALUES ('{username}', {id})");
    }

    public async Task RemoveFromFavorite(string username, int id)
    {
        await _database.Call($"DELETE FROM favorites WHERE userid='{username}' AND songid={id}");
    }

    public async Task<List<Song>> GetFavorites(string username)
    {
        var songServices = new SongServices(_database);
        var songs = new List<Song>();
        var result = (await _database.Call($"SELECT songid FROM favorites WHERE userid='{username}'")).Select(e => e["songid"]);
        foreach (var id in result)
        {
            songs.Add(await songServices.GetSong(id));
        }

        return songs;
    }
}