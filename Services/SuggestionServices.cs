using tourmaline.Models;

namespace tourmaline.Services;

public class SuggestionServices
{
    private readonly Database _database;
    private readonly SongServices _songServices;
    private readonly UserServices _userServices;
    private readonly RecentServices _recentServices;
    private readonly FavoriteServices _favoriteServices;
    private readonly FollowServices _followServices;

    public SuggestionServices(Database database)
    {
        _database = database;
        _songServices = new SongServices(database);
        _userServices = new UserServices(database);
        _recentServices = new RecentServices(database);
        _favoriteServices = new FavoriteServices(database);
        _followServices = new FollowServices(database);
    }

    public async Task<List<Song>> GetNew()
    {
        var result = new List<Song>();
        var queryResult = await _database.Call("SELECT * FROM song ORDER BY uploadTime DESC LIMIT 15");
        foreach (var r in queryResult)
        {
            result.Add(await _songServices.GetSong(r["id"]));
        }

        return result;
    }

    public async Task<List<Song>> GetTop50()
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
            result.Add(await _songServices.GetSong(songInfo["songid"]));
        }

        return result;
    }

    public async Task<List<Song>> GetRecentPlays(string username)
    {
        var result = new List<Song>();
        var ids = (await _database.Call(
                $"SELECT song FROM recents WHERE username='{username}' ORDER BY added_date DESC LIMIT 15"))
            .Select<dynamic, int>(e => e["song"]);
        foreach (var id in ids)
        {
            result.Add(await _songServices.GetSong(id));
        }

        return result;
    }

    public async Task<List<Song>> GetRecentUploads(string username)
    {
        var followings = await _followServices.GetFollowings(username);
        var songs = new List<Song>();
        foreach (var artist in followings)
        {
            var artistSongs = (await _songServices.GetUserUploads(artist.Username)).Take(3);
            songs.AddRange(artistSongs);
        }

        return songs;
    }

    public async Task<List<User>> GetRelatedArtist(string username)
    {
        var recentSongs = await _recentServices.GetRecent(username);
        var favoriteSongs = await _favoriteServices.GetFavorites(username);
        var following = await _followServices.GetFollowings(username);
        var users = new List<User>();
        foreach (var song in recentSongs.Where(song => !following.Exists(e => e.Username == song.Uploader)))
        {
            users.Add(await _userServices.GetUser(song.Uploader));
        }
        
        foreach (var song in favoriteSongs.Where(song => !following.Exists(e => e.Username == song.Uploader)))
        {
            users.Add(await _userServices.GetUser(song.Uploader));
        }

        return users;
    }

    public async Task<List<Song>> GetSongSuggestions(string username)
    {
        var recentSongs = (await _recentServices.GetRecent(username)).Take(30);
        var tagCounts = new Dictionary<string, int>();
        foreach (var song in recentSongs)
        {
            foreach (var tag in song.Tags)
            {
                if (tagCounts.ContainsKey(tag))
                {
                    tagCounts[tag] += 1;
                }
                else
                {
                    tagCounts.Add(tag, 1);
                }
            }
        }

        var mostCommonTags = tagCounts.ToList().OrderByDescending(pair => pair.Value).Take(3).Select(e => e.Key).ToList();
        var relatedSongs = new List<Song>();
        foreach (var tag in mostCommonTags)
        {
            var ids = (await _database.Call($"SELECT id FROM songtags WHERE tag='{tag}'")).Select(e => e["id"]);
            foreach (var id in ids)
            {
                relatedSongs.Add(await _songServices.GetSong(id));
            }
        }

        return relatedSongs.Take(30).ToList();
    }
}