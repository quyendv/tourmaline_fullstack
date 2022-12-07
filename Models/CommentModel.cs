namespace tourmaline.Models
{
    public class CommentModel
    {
        public CommentModel(int id, string content)
        {
            Id = id;
            Content = content;
        }

        public int Id { get;set; }
        public string Content { get; set; }
    }
}
