namespace tourmaline.Models;

public class Playlist
{
    public Playlist(int id = -1, string username = "", string name = "")
    {
        Id = id;
        Name = name;
        UserName = username;
        Songs = new List<Song>();
    }

    public int Id { get; set; }
    public string UserName { get; set; }
    public string Name { get; set; }
    public List<Song> Songs { get; set; }
}