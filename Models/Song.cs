namespace tourmaline.Models;

public class Song
{
    public Song(int id = -1, string uploader = "", string name = "", string coverUrl = "", string lyrics = "",
        string description = "", string album = "", string path = "")
    {
        Id = id;
        UploadTime = DateTime.Parse("1970-01-01 00:00:00");
        Uploader = uploader;
        Name = name;
        CoverUrl = coverUrl;
        Lyrics = lyrics;
        Description = description;
        Album = album;
        Path = path;
    }

    public int Id { get; set; }
    public DateTime UploadTime { get; set; }
    public string Uploader { get; set; }
    public string Name { get; set; }
    public string CoverUrl { get; set; }
    public string Lyrics { get; set; }
    public string Description { get; set; }
    public string Album { get; set; }
    public string Path { get; set; }
}