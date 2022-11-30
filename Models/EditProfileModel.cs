namespace tourmaline.Models
{
    public class EditProfileModel
    {
        public EditProfileModel(string username, string name, string bio, DateTime birth, bool gender, string email, bool isAdmin)
        {
            Username = username;
            Name = name;
            Bio = bio;
            Birth = birth;
            Gender = gender;
            Email = email;
            IsAdmin = isAdmin;
        }

        public string Username { get; set; }
        public string Name { get; set; }
        public string Bio { get; set; }
        public DateTime Birth { get; set; }
        public bool Gender { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
