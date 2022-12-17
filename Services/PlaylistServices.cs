using tourmaline.Helpers;
using tourmaline.Models;

namespace tourmaline.Services;

public class PlaylistServices
{
    private readonly Database _database;

    public PlaylistServices(Database database)
    {
        _database = database;
    }

    public async Task<Playlist> GetPlaylist(int id)
    {
        var result = (await _database.Call($"SELECT * FROM playlist WHERE id={id}")).First();
        return new Playlist(id: id)
        {
            Username = result["user"],
            Name = result["name"],
            Description = result["description"],
            Songs = await GetSongs(id),
        };
    }

    public async Task AddPlaylist(Playlist playlist)
    {
        await _database.Call($"INSERT INTO playlist (id, user, name, description) " +
                       $"VALUES ({playlist.Id}, '{playlist.Username}', '{playlist.Name.Normal()}', '{playlist.Description.Normal()}')");
    }

    public async Task DeletePlaylist(int id)
    {
        await _database.Call($"DELETE FROM playlist WHERE id={id}");
    }

    public async Task AddSong(int playlistId, int songId)
    {
        await _database.Call($"INSERT IGNORE INTO playlistsongs (playlistId, songId, added_date) VALUES ({playlistId}, {songId}, '{DateTime.Now:yyyy-MM-dd H:mm:ss}')");
    }

    public async Task RemoveSong(int playlistId, int songId)
    {
        await _database.Call($"DELETE FROM playlistsongs WHERE playlistId={playlistId} AND songId={songId}");
    }

    private async Task<List<Song>> GetSongs(int id)
    {
        var songServices = new SongServices(_database);
        var result = (await _database.Call($"SELECT songId FROM playlistsongs WHERE playlistId={id} ORDER BY added_date DESC")).Select(e => e["songId"]);
        var songs = new List<Song>();
        foreach (var song in result)
        {
            songs.Add(await songServices.GetSong(song));
        }
        return songs;
    }

    public async Task<bool> IsPlaylistExist(int id)
    {
        return (await _database.Call($"SELECT * FROM playlist WHERE id={id}")).Count != 0;
    }

    public async Task<UserPlaylist> GetUserPlaylists(string username)
    {
        var playlists = (await _database.Call($"SELECT id FROM playlist WHERE user='{username}'")).Select(e => e["id"]);
        var userPlaylist = new UserPlaylist();
        foreach (var playlist in playlists)
        {
            userPlaylist.Playlists.Add(await GetPlaylist(playlist));
        }

        return userPlaylist;
    }
}