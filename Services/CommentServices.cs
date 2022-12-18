using tourmaline.Helpers;
using tourmaline.Models;

namespace tourmaline.Services
{
    public class CommentServices
    {
        private readonly Database _database;

        public CommentServices(Database database)
        {
            _database = database;
        }

        public async Task<Comment> GetComment(int id)
        {
            var result = (await _database.Call($"SELECT * FROM comment WHERE id={id}")).First();
            return new Comment
            {
                Id = result["id"],
                UserName = result["username"],
                CreateTime = result["createTime"],
                LastEditedTime = result["lastEditedTime"],
                Content = result["content"],
                SongId = result["song"]
            };
        }

        public async Task<string> GetCommenter(int commentId)
        {
            return (await GetComment(commentId)).UserName;
        }

        public async Task<bool> DeleteComment(int id)
        {
            return await _database.Delete("comment", new Dictionary<string, dynamic>()
            {
                { "id", id }
            });
        }

        public async Task<bool> UpdateComment(int id, string newContent, DateTime newUpdateTime)
        {
            return await _database.CallUpdateProcedure("EditComment", new Dictionary<string, dynamic>()
                {
                    { "commentId", id },
                    { "newContent", newContent },
                    { "editTime", newUpdateTime }
                });
        }

        public async Task<int> Post(Comment comment)
        {
            int commentId = -1;

            var result = await _database.AddAndGetObjectId("comment", new Dictionary<string, dynamic>()
                {
                    { "content", comment.Content.Normal() },
                    { "createTime", comment.CreateTime },
                    { "lastEditedTime", comment.LastEditedTime },
                    { "song", comment.SongId },
                    { "username",  comment.UserName }
                }, out commentId);

            if (result == false)
            {
                return -1;
            }

            return commentId;
        }

        public async Task<bool> DoesCommentExist(int id)
        {
            return (await _database.Call($"SELECT * FROM comment WHERE id={id}")).Count != 0;
        }

        public async Task<List<Dictionary<string, dynamic>>> ListAllCommentsOnSong(int songId)
        {
            return await _database.CallReadProcedure("ListCommentsOfSong", new Dictionary<string, dynamic>()
                {
                    { "id", songId }
                });
        }
    }
}
