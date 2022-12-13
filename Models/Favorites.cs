namespace tourmaline.Models;

public class Favorites
{
    public Favorites(List<Song>? songs = null)
    {
        Songs = songs ?? new List<Song>();
    }

    public List<Song> Songs { get; set; }
}