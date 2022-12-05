namespace tourmaline.Models;

public class UserPlaylist
{
    public UserPlaylist()
    {
        Playlists = new List<Playlist>();
    }

    public List<Playlist> Playlists { get; set; }
}