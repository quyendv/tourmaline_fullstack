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
            var cons = new List<string>();
            if (conditions != null)
                foreach (var entry in conditions)
                {
                    if ((entry.Value is string) || (entry.Value is DateTime)) conditions[entry.Key] = $"'{entry.Value}'";
                    cons.Add($"{entry.Key} = {conditions[entry.Key]}");
                }

            var queryString =
                $"SELECT {(columns == null ? "*" : string.Join(", ", columns))} FROM {table} {(conditions != null ? $"WHERE {string.Join(", ", cons)}" : "")} {(sortBy == null ? "" : $"SORT BY {sortBy}")}";
            Console.WriteLine($"Query: {queryString}");
            var reader = new MySqlCommand(queryString, connection).ExecuteReader();
            if (reader.HasRows)
                while (reader.Read())
                {
                    var record = new Dictionary<string, dynamic>();
                    for (var i = 0; i < reader.FieldCount; i++) record.Add(reader.GetName(i), reader.GetValue(i));
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
            if ((entry.Value is string) || (entry.Value is DateTime))
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
            if ((entry.Value is string) || (entry.Value is DateTime)) values[entry.Key] = $"'{entry.Value}'";
            vals.Add($"{entry.Key} = {values[entry.Key]}");
        }

        var cons = new List<string>();
        foreach (var entry in conditions)
        {
            if ((entry.Value is string) || (entry.Value is DateTime)) conditions[entry.Key] = $"'{entry.Value}'";
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
            if ((entry.Value is string) || (entry.Value is DateTime)) conditions[entry.Key] = $"'{entry.Value}'";
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

    private MySqlDataReader CallProcedure(MySqlConnection connection, string procedureName, Dictionary<string, dynamic> parameters)
    {
        var command = new MySqlCommand(procedureName, connection);
        foreach (var parameter in parameters)
        {
            command.Parameters.AddWithValue(parameter.Key, parameter.Value);
        }
        command.CommandType = System.Data.CommandType.StoredProcedure;

        return command.ExecuteReader();
    }

    public Task<List<Dictionary<string, dynamic>>> CallFindProcedure(string procedureName, string match)
    {
        return CallReadProcedure(procedureName, new Dictionary<string, dynamic>() { { "keyword", '%' + match + '%' } });
    }

    public Task<bool> CallUpdateProcedure(string procedureName, Dictionary<string, dynamic> parameters)
    {
        var result = true;
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        try
        {
            CallProcedure(connection, procedureName, parameters);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            result = false;
        }

        connection.Close();
        return Task.FromResult(result);
    }

    public Task<List<Dictionary<string, dynamic>>> CallReadProcedure(string procedureName, Dictionary<string, dynamic> parameters)
    {
        var result = new List<Dictionary<string, dynamic>>();
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        try
        {
            var reader = CallProcedure(connection, procedureName, parameters);
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    var record = new Dictionary<string, dynamic>();
                    for (var i = 0; i < reader.FieldCount; i++)
                        record.Add(reader.GetName(i), reader.GetValue(i));

                    result.Add(record);
                }

            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        connection.Close();
        return Task.FromResult(result);
    }
}