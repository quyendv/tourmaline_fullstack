namespace tourmaline.Models;

public class Song
{
    public Song(int id = -1, string uploader = "", string name = "",
        string description = "", List<string>? tags = null, int listenTimes = 0)
    {
        Id = id;
        UploadTime = DateTime.Now;
        Uploader = uploader;
        Name = name;
        Description = description;
        Tags = tags ?? new List<string>();
        ListenTimes = listenTimes;
    }

    public int Id { get; set; }
    public DateTime UploadTime { get; set; }
    public string Uploader { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
    public double Duration { get; set; }
    public int ListenTimes { get; set; }
}