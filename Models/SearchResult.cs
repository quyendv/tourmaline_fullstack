namespace tourmaline.Models;

public class SearchResult : IComparable
{
    public SearchResult(double rating = 0, User? user = null, Song? song = null, Playlist? playlist = null)
    {
        Rating = rating;
        User = user;
        Song = song;
        Playlist = playlist;
    }
    
    public User? User { get; set; }
    public Song? Song { get; set; }
    public Playlist? Playlist { get; set; }
    public double Rating { get; set; }


    public int CompareTo(object? obj)
    {
        if (obj is SearchResult result)
        {
            return Rating.CompareTo(result.Rating);
        }

        return -1;
    }
}