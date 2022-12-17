namespace tourmaline.Models;

public class Playlist : IEquatable<Playlist>
{
    public Playlist(int id = -1, string username = "", string name = "", string description = "")
    {
        Id = id;
        Name = name;
        Username = username;
        Description = description;
        Songs = new List<Song>();
    }

    public int Id { get; }
    public string Username { get; set; }
    public string Name { get; set; }
    public List<Song> Songs { get; set; }
    public string Description { get; set; }

    public bool Equals(Playlist? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return Id == other.Id;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        if (obj.GetType() != this.GetType()) return false;
        return Equals((Playlist)obj);
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }
}