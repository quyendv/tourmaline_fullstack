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
        return new Playlist
        {
            Id = id,
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
        await _database.Call($"INSERT IGNORE INTO playlistsongs (playlistId, songId) VALUES ({playlistId}, {songId})");
    }

    public async Task RemoveSong(int playlistId, int songId)
    {
        await _database.Call($"DELETE FROM playlistsongs WHERE playlistId={playlistId} AND songId={songId}");
    }

    private async Task<List<Song>> GetSongs(int id)
    {
        var songServices = new SongServices(_database);
        var result = (await _database.Call($"SELECT songId FROM playlistsongs WHERE playlistId={id}")).Select(e => e["songId"]);
        var songs = result.Select(songId => songServices.GetSong(songId)).Cast<Song>().ToList();
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