namespace tourmaline.Helpers;

public static class StringExtensions
{
    public static string Normal(this string str)
    {
        return str.Replace("'", "\\'").Replace("\"", "\\\"");
    }
}