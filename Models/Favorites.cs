namespace tourmaline.Models;

public class Favorites
{
    public Favorites(string username = "", List<Song>? songs = null)
    {
        UserName = username;
        Songs = songs ?? new List<Song>();
    }

    public string UserName { get; set; }
    public List<Song> Songs { get; set; }
}