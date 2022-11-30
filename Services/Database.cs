using MySqlConnector;

namespace tourmaline.Services;

public class Database
{
    public Database(string connectionString)
    {
        ConnectionString = connectionString;
    }

    private string ConnectionString { get; }

    public Task<List<Dictionary<string, dynamic>>> Read(string table, IDictionary<string, dynamic>? conditions = null,
        List<string>? columns = null, string? sortBy = null)
    {
        var result = new List<Dictionary<string, dynamic>>();
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        try
        {
            if (columns == null || columns.Count == 0)
            {
                columns = new List<string>();
                var query = new MySqlCommand($"SHOW COLUMNS FROM `{table}`", connection).ExecuteReader();
                while (query.Read()) columns.Add(query.GetString(0));
                query.Close();
            }

            var cons = new List<string>();
            if (conditions != null)
                foreach (var entry in conditions)
                {
                    if (entry.Value is string) conditions[entry.Key] = $"'{entry.Value}'";
                    cons.Add($"{entry.Key} = {conditions[entry.Key]}");
                }

            var queryString =
                $"SELECT {(columns.Count == 0 ? "*" : string.Join(", ", columns))} FROM {table} {(conditions != null ? $"WHERE {string.Join(", ", cons)}" : "")} {(sortBy == null ? "" : $"SORT BY {sortBy}")}";
            Console.WriteLine($"Query: {queryString}");
            var reader = new MySqlCommand(queryString, connection).ExecuteReader();
            if (reader.HasRows)
                while (reader.Read())
                {
                    var record = new Dictionary<string, dynamic>();
                    for (var i = 0; i < columns.Count; i++) record.Add(columns[i], reader.GetValue(i));
                    result.Add(record);
                }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        connection.Close();
        return Task.FromResult(result);
    }

    public Task<bool> Add(string table, IDictionary<string, dynamic> values)
    {
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        foreach (var entry in values)
            if (entry.Value is string)
                values[entry.Key] = $"'{entry.Value}'";
        var queryString =
            $"INSERT INTO {table} ({string.Join(", ", values.Keys)}) VALUES ({string.Join(", ", values.Values)})";
        Console.WriteLine($"Query: {queryString}");
        try
        {
            new MySqlCommand(queryString, connection).ExecuteReader();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Task.FromResult(false);
        }

        connection.Close();
        return Task.FromResult(true);
    }

    public Task<bool> Update(string table, IDictionary<string, dynamic> values, IDictionary<string, dynamic> conditions)
    {
        var vals = new List<string>();
        foreach (var entry in values)
        {
            if (entry.Value is string) values[entry.Key] = $"'{entry.Value}'";
            vals.Add($"{entry.Key} = {values[entry.Key]}");
        }

        var cons = new List<string>();
        foreach (var entry in conditions)
        {
            if (entry.Value is string) conditions[entry.Key] = $"'{entry.Value}'";
            cons.Add($"{entry.Key} = {conditions[entry.Key]}");
        }

        var queryString = $"UPDATE {table} SET {string.Join(", ", vals)} WHERE {string.Join(", ", cons)}";
        Console.WriteLine($"Query: {queryString}");
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        var check = true;
        try
        {
            new MySqlCommand(queryString, connection).ExecuteReader();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            check = false;
        }

        connection.Close();
        return Task.FromResult(check);
    }

    public Task<bool> Delete(string table, IDictionary<string, dynamic> conditions)
    {
        var cons = new List<string>();
        foreach (var entry in conditions)
        {
            if (entry.Value is string) conditions[entry.Key] = $"'{entry.Value}'";
            cons.Add($"{entry.Key} = {conditions[entry.Key]}");
        }

        var queryString = $"DELETE FROM {table} WHERE {string.Join(" AND ", cons)}";
        Console.WriteLine($"Query: {queryString}");
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        var check = true;
        try
        {
            new MySqlCommand(queryString, connection).ExecuteReader();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            check = false;
        }

        connection.Close();
        return Task.FromResult(check);
    }
}