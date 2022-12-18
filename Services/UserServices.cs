using tourmaline.Helpers;
using tourmaline.Models;

namespace tourmaline.Services;

public class UserServices
{
    private readonly Database _database;

    public UserServices(Database database)
    {
        _database = database;
    }

    public async Task<User> GetUser(string username)
    {
        var result = (await _database.Call($"SELECT * FROM user WHERE username='{username}'")).First();
        return new User(username: result["username"])
        {
            Bio = result["bio"],
            Birth = result["birth"],
            CreateTime = result["createTime"],
            Email = result["email"],
            Gender = result["gender"] == 1,
            IsAdmin = result["isAdmin"] == 1,
            Name = result["name"]
        };
    }

    public async Task AddUser(User user, string password)
    {
        await _database.Call(
            $"INSERT INTO user (username, name, bio, createTime, birth, password, gender, email, isAdmin) " +
            $"VALUES ('{user.Username}', '{user.Name.Normal()}', '{user.Bio.Normal()}', '{user.CreateTime:yyyy-MM-dd H:mm:ss}', '{user.Birth:yyyy-MM-dd H:mm:ss}', " +
            $"'{password}', {(user.Gender ? "1" : "0")}, '{user.Email}', {(user.IsAdmin ? "1" : "0")})");
    }

    public async Task<bool> IsAdmin(string username)
    {
        var result = (await _database.Call($"SELECT isAdmin FROM user WHERE username='{username}'")).First();
        return result["isAdmin"] == 1;
    }

    public async Task EditInfo(string username, string? name, string? bio, bool? gender, DateTime? birth)
    {
        await _database.Call($"UPDATE user " +
                             $"WHERE username='{username}' SET " +
                             $"{(name != null ? $"name='{name.Normal()}'" : "")}, " +
                             $"{(bio != null ? $"bio='{bio.Normal()}'" : "")}, " +
                             $"{(gender != null ? gender == true ? "gender=1" : "gender=0" : "")}, " +
                             $"{(birth != null ? $"birth='{birth:yyyy-MM-dd H:mm:ss}'" : "")}");
    }

    public async Task<bool> IsUserExist(string username)
    {
        return (await _database.Call($"SELECT * FROM user WHERE username='{username}'")).Count != 0;
    }

    public async Task<string> GetPassword(string username)
    {
        return (await _database.Call($"SELECT password FROM user WHERE username='{username}'")).First()["password"];
    }

    public async Task ChangePassword(string username, string passwordHash)
    {
        await _database.Call($"UPDATE user WHERE username={username} SET password={passwordHash}");
    }
}