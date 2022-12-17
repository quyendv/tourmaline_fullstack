namespace tourmaline.Models;

public class Song : IEquatable<Song>
{
    public Song(int id = -1, string uploader = "", string name = "",
        string description = "", List<string>? tags = null, int listenTimes = 0, int favorites = 0)
    {
        Id = id;
        UploadTime = DateTime.Now;
        Uploader = uploader;
        Name = name;
        Description = description;
        Tags = tags ?? new List<string>();
        ListenTimes = listenTimes;
        Favorites = favorites;
    }

    public readonly int Id;
    public DateTime UploadTime { get; set; }
    public string Uploader { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
    public double Duration { get; set; }
    public int ListenTimes { get; set; }
    public int Favorites { get; set; }

    public bool Equals(Song? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == this.GetType() && Equals((Song)obj);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
}