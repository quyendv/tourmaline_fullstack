namespace tourmaline.Models;

public class Song
{
    public Song(int id = -1, string uploader = "", string name = "", string lyrics = "",
        string description = "", string album = "")
    {
        Id = id;
        UploadTime = DateTime.Parse("1970-01-01 00:00:00");
        Uploader = uploader;
        Name = name;
        Lyrics = lyrics;
        Description = description;
        Album = album;
    }

    public int Id { get; set; }
    public DateTime UploadTime { get; set; }
    public string Uploader { get; set; }
    public string Name { get; set; }
    public string Lyrics { get; set; }
    public string Description { get; set; }
    public string Album { get; set; }
}