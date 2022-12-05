namespace tourmaline.Models;

public class Playlist
{
    public Playlist(int id = -1, string username = "", string name = "")
    {
        Id = id;
        Name = name;
        Username = username;
        Songs = new List<Song>();
    }

    public int Id { get; set; }
    public string Username { get; set; }
    public string Name { get; set; }
    public List<Song> Songs { get; set; }
}