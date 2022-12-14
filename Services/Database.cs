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
                    conditions[entry.Key] = entry.Value switch
                    {
                        string => $"'{entry.Value}'",
                        DateTime time => $"'{time:yyyy-MM-dd H:mm:ss}'",
                        _ => conditions[entry.Key]
                    };

                    cons.Add($"{entry.Key} = {conditions[entry.Key]}");
                }

            var queryString =
                $"SELECT {(columns == null ? "*" : string.Join(", ", columns))} FROM {table} {(conditions != null ? $"WHERE {string.Join("AND ", cons)}" : "")} {(sortBy == null ? "" : $"SORT BY {sortBy}")}";
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

    public Task<List<Dictionary<string, dynamic>>> Call(string query)
    {
        var result = new List<Dictionary<string, dynamic>>();
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        try
        {
            Console.WriteLine($"Query: {query}");
            var reader = new MySqlCommand(query, connection).ExecuteReader();
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

    private MySqlDataReader? AddDetail(string table, IDictionary<string, dynamic> values, string extraQuery = "")
    {
        var connection = new MySqlConnection(ConnectionString);
        connection.Open();
        foreach (var entry in values)
            if (entry.Value is string)
                values[entry.Key] = $"'{entry.Value}'";
            else if (entry.Value is DateTime)
                values[entry.Key] = $"'{((DateTime)(entry.Value)).ToString("yyyy-MM-dd H:mm:ss")}'";

        var queryString =
            $"INSERT INTO {table} ({string.Join(", ", values.Keys)}) VALUES ({string.Join(", ", values.Values)})";
        if (extraQuery != "")
        {
            queryString += $"; {extraQuery}";
        }
        Console.WriteLine($"Query: {queryString}");
        try
        {
            return new MySqlCommand(queryString, connection).ExecuteReader();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }

        connection.Close();
        return null;
    }

    public Task<bool> Add(string table, IDictionary<string, dynamic> values)
    {
        return Task.FromResult(AddDetail(table, values) != null);
    }

    public Task<bool> AddAndGetObjectId(string table, IDictionary<string, dynamic> values, out int objId)
    {
        objId = -1;

        var reader = AddDetail(table, values, "SELECT LAST_INSERT_ID();");
        if (reader == null)
        {
            return Task.FromResult(false);
        }

        try
        {
            if (reader.Read())
            {
                objId = reader.GetFieldValue<int>(0);
            }

            return Task.FromResult(true);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
        }

        return Task.FromResult(false);
    }

    public Task<bool> Update(string table, IDictionary<string, dynamic> values, IDictionary<string, dynamic> conditions)
    {
        var vals = new List<string>();
        foreach (var entry in values)
        {
            if (entry.Value is string) values[entry.Key] = $"'{entry.Value}'";
            else if (entry.Value is DateTime) values[entry.Key] = $"'{((DateTime)(entry.Value)).ToString("yyyy-MM-dd H:mm:ss")}'";
            vals.Add($"{entry.Key} = {values[entry.Key]}");
        }

        var cons = new List<string>();
        foreach (var entry in conditions)
        {
            if (entry.Value is string) conditions[entry.Key] = $"'{entry.Value}'";
            else if (entry.Value is DateTime) conditions[entry.Key] = $"'{((DateTime)(entry.Value)).ToString("yyyy-MM-dd H:mm:ss")}'";


            cons.Add($"{entry.Key} = {conditions[entry.Key]}");
        }

        var queryString = $"UPDATE {table} SET {string.Join(", ", vals)} WHERE {string.Join("AND ", cons)}";
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
            else if (entry.Value is DateTime) conditions[entry.Key] = $"'{((DateTime)(entry.Value)).ToString("yyyy-MM-dd H:mm:ss")}'";

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