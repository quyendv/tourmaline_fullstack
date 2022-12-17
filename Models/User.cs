namespace tourmaline.Models;

public class User : IEquatable<User>
{
    public User(string username = "", bool isAdmin = false)
    {
        Username = username;
        CreateTime = DateTime.Now;
        IsAdmin = isAdmin;
        Name = "";
        Gender = true;
        Birth = DateTime.Parse("1970-01-01 00:00:00");
        Bio = "";
        Email = "";
    }

    public string Username { get; }
    public string Name { get; set; }
    public bool Gender { get; set; }
    public DateTime Birth { get; set; }
    public string Bio { get; set; }
    public DateTime CreateTime { get; set; }
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
    
    public bool Equals(User? other)
    {
        if (ReferenceEquals(null, other)) return false;
        if (ReferenceEquals(this, other)) return true;
        return Username == other.Username;
    }

    public override bool Equals(object? obj)
    {
        if (ReferenceEquals(null, obj)) return false;
        if (ReferenceEquals(this, obj)) return true;
        return obj.GetType() == GetType() && Equals((User)obj);
    }

    public override int GetHashCode()
    {
        return Username.GetHashCode();
    }
}