namespace tourmaline.Models;

public class Playlist
{
    public Playlist(int id = -1, string username = "", string name = "", string cover = "")
    {
        Id = id;
        Name = name;
        UserName = username;
        Songs = new List<Song>();
        Cover = cover;
    }

    public int Id { get; set; }
    public string UserName { get; set; }
    public string Name { get; set; }
    public string Cover { get; set; }
    public List<Song> Songs { get; set; }
}