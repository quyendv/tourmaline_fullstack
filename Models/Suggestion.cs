namespace tourmaline.Models;

public class Suggestion
{
    public Suggestion()
    {
        RecentlyUploaded = new List<Song>();
        RecentlyPlayed = new List<Song>();
        Top50 = new List<Song>();
    }
    
    public List<Song> RecentlyUploaded { get; set; }
    public List<Song> RecentlyPlayed { get; set; }
    public List<Song> Top50 { get; set; }
}