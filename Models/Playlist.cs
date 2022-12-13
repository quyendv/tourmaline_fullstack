namespace tourmaline.Models;

public class Playlist
{
    public Playlist(long id = -1, string username = "", string name = "", string description = "")
    {
        Id = id;
        Name = name;
        Username = username;
        Description = description;
        Songs = new List<Song>();
    }

    public long Id { get; set; }
    public string Username { get; set; }
    public string Name { get; set; }
    public List<Song> Songs { get; set; }
    public string Description { get; set; }
}