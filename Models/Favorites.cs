namespace tourmaline.Models;

public class Favorites
{
    public Favorites(string username = "", int songId = -1)
    {
        UserName = username;
        SongId = songId;
    }

    public string UserName { get; set; }
    public int SongId { get; set; }
}