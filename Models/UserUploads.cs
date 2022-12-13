namespace tourmaline.Models;

public class UserUploads
{
    public UserUploads(List<Song>? uploads = null)
    {
        Uploads = uploads ?? new List<Song>();
    }

    public List<Song> Uploads { get; set; }
}