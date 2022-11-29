namespace tourmaline.Models;

public class Recents
{
    public Recents(List<Song>? recentSongs = null)
    {
        RecentSongs = recentSongs ?? new List<Song>();
    }

    public List<Song> RecentSongs;
}