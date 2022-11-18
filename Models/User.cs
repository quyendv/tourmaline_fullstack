namespace tourmaline.Models;

public class User
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

    public string Username { get; set; }
    public string Name { get; set; }
    public bool Gender { get; set; }
    public DateTime Birth { get; set; }
    public string Bio { get; set; }
    public DateTime CreateTime { get; set; }
    public string Email { get; set; }
    public bool IsAdmin { get; set; }
}