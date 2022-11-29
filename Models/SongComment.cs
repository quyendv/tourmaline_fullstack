namespace tourmaline.Models;

public class SongComment
{
    public SongComment(int id = -1, List<Comment>? comments = null)
    {
        Id = id;
        Comments = comments ?? new List<Comment>();
    }
    
    public int Id { get; set; }
    public List<Comment> Comments { get; set; }
}