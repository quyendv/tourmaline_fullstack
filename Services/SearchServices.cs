using tourmaline.Models;

namespace tourmaline.Services;

public class SearchServices
{
    private readonly Database _database;
    private readonly SongServices _songServices;
    private readonly UserServices _userServices;
    private readonly PlaylistServices _playlistServices;

    public SearchServices(Database database)
    {
        _database = database;
        _playlistServices = new PlaylistServices(database);
        _userServices = new UserServices(database);
        _songServices = new SongServices(database);
    }

    public async Task<List<SearchResult>> Search(string query)
    {
        var songResults = await _database.CallFindProcedure("FindSongs", query);
        var userResults = await _database.CallFindProcedure("FindUsers", query);
        var playlistResults = await _database.CallFindProcedure("FindPlaylists", query);

        var results = new List<SearchResult>();
        
        foreach (var song in songResults)
        {
            results.Add(new SearchResult
            {
                Song = await _songServices.GetSong(song["id"]),
                Rating = CalculateSimilarity(song["name"], query),
            });
        }

        foreach (var user in userResults)
        {
            results.Add(new SearchResult
            {
                User = await _userServices.GetUser(user["username"]),
                Rating = CalculateSimilarity(user["username"], query),
            });
        }

        foreach (var playlist in playlistResults)
        {
            results.Add(new SearchResult
            {
                Playlist = await _playlistServices.GetPlaylist(playlist["id"]),
                Rating = CalculateSimilarity(playlist["name"], query),
            });
        }
        
        results.Sort((a, b) => b.CompareTo(a));
        return results;
    }

    private int ComputeLevenshteinDistance(string source, string target)
    {
        if (source.Length == 0 || target.Length == 0) return 0;
        if (source == target) return source.Length;

        var sourceWordCount = source.Length;
        var targetWordCount = target.Length;

        // Step 1
        if (sourceWordCount == 0)
            return targetWordCount;

        if (targetWordCount == 0)
            return sourceWordCount;

        var distance = new int[sourceWordCount + 1, targetWordCount + 1];

        // Step 2
        for (var i = 0; i <= sourceWordCount; i++) distance[i, 0] = i;

        for (var j = 0; j <= targetWordCount; j++) distance[0, j] = j;

        for (var i = 1; i <= sourceWordCount; i++)
        for (var j = 1; j <= targetWordCount; j++)
        {
            // Step 3
            var cost = target[j - 1] == source[i - 1] ? 0 : 1;

            // Step 4
            distance[i, j] = Math.Min(Math.Min(distance[i - 1, j] + 1, distance[i, j - 1] + 1),
                distance[i - 1, j - 1] + cost);
        }

        return distance[sourceWordCount, targetWordCount];
    }

    private double CalculateSimilarity(string source, string target)
    {
        if (source.Length == 0 || target.Length == 0) return 0.0;
        if (source == target) return 1.0;

        var stepsToSame = ComputeLevenshteinDistance(source, target);
        return 1.0 - stepsToSame / (double)Math.Max(source.Length, target.Length);
    }
}