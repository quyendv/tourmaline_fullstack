using tourmaline.Models;

namespace tourmaline.Services;

public class FeedServices
{
    private readonly FollowServices _followServices;
    private readonly SongServices _songServices;

    public FeedServices(Database database)
    {
        _followServices = new FollowServices(database);
        _songServices = new SongServices(database);
    }

    public async Task<List<Song>> GetRecentUploads(string username)
    {
        var followings = await _followServices.GetFollowings(username);
        var songs = new List<Song>();
        foreach (var artist in followings)
        {
            var artistSongs = (await _songServices.GetUserUploads(artist.Username));
            songs.AddRange(artistSongs);
        }

        return songs.OrderByDescending(e => e.UploadTime).ToList();
    }
}