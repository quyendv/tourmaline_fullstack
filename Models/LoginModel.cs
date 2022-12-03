namespace tourmaline.Models;

public class LoginModel
{
    public LoginModel()
    {
        Username = "";
        Password = "";
    }

    public string Username { get; set; }
    public string Password { get; set; }
}