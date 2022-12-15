using tourmaline.Models;

namespace tourmaline.Services;

public class FollowServices
{
    private readonly Database _database;
    private readonly UserServices _userServices;

    public FollowServices(Database database)
    {
        _database = database;
        _userServices = new UserServices(database);
    }

    public async Task AddFollow(string username, string following)
    {
        await _database.Call($"INSERT INTO follow (username, following) VALUES ('{username}', '{following}')");
    }
    
    public async Task RemoveFollow(string username, string following)
    {
        await _database.Call($"DELETE FROM follow WHERE username='{username}' AND following='{following}'");
    }

    public async Task<List<User>> GetFollowings(string username)
    {
        var result = (await _database.Call($"SELECT following FROM follow WHERE username='{username}'")).Select(e => e["following"]);
        var users = new List<User>();
        foreach (var user in result)
        {
            users.Add(await _userServices.GetUser(user));
        }

        return users;
    }

    public async Task<List<User>> GetFollowers(string username)
    {
        var result = (await _database.Call($"SELECT username FROM follow WHERE following='{username}'")).Select(e => e["following"]);
        var users = new List<User>();
        foreach (var user in result)
        {
            users.Add(await _userServices.GetUser(user));
        }

        return users;
    }
}