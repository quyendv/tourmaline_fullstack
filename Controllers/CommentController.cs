using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommentController : ControllerBase
    {
        public CommentController(Database database)
        {
            _connection = database;
        }
        private readonly Database _connection;

        private string CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "";

        private bool CanCurrentUserModifyComment(string commenterName)
        {
            var isAdminClaim = HttpContext.User.FindFirst(UserController.IsAdminClaimName);
            if (isAdminClaim != null && bool.Parse(isAdminClaim.Value)) return true;

            return commenterName == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
        }

        [Route("post")]
        [HttpPost]
        public async Task<ActionResult> PostComment([FromForm] int id, [FromForm] string content)
        {
            var idConds = new Dictionary<string, dynamic>() { { "id", id } };
            var songObjects = await _connection.Read("song", idConds);
            var doesSongExist = songObjects.Count != 0;

            if (doesSongExist)
            {
                var result = await _connection.Add("comment", new Dictionary<string, dynamic>()
                {
                    { "content", content },
                    { "createTime", DateTime.Now },
                    { "lastEditedTime", DateTime.Now },
                    { "song", id },
                    { "username",  CurrentSessionUsername }
                });

                return result ? Ok("Comment posted OK!") : StatusCode(StatusCodes.Status500InternalServerError, "Error in server side posting comment!");
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song with given ID does not exist!");
            }
        }

        [Route("remove/{commentId}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteComment(int commentId)
        {
            var idConds = new Dictionary<string, dynamic>() { { "id", commentId } };
            var commentObjects = await _connection.Read("comment", idConds);
            var doesCommentExist = commentObjects.Count != 0;

            if (doesCommentExist)
            {
                if (CanCurrentUserModifyComment(CurrentSessionUsername))
                {
                    var result = await _connection.Delete("comment", idConds);
                    return result ? Ok("Comment deleted OK!") : StatusCode(StatusCodes.Status500InternalServerError, "Error in server side deleting comment!");
                } 
                else
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "No permission to delete this comment!");
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song with given ID does not exist!");
            }
        }

        [Route("edit")]
        [HttpPut]
        public async Task<ActionResult> EditComment([FromForm] int id, [FromForm] string content)
        {
            var idConds = new Dictionary<string, dynamic>() { { "id", id } };
            var commentObjects = await _connection.Read("comment", idConds);
            var doesCommentExist = commentObjects.Count != 0;

            if (doesCommentExist)
            {
                if (CanCurrentUserModifyComment(CurrentSessionUsername))
                {
                    var result = await _connection.CallUpdateProcedure("EditComment", new Dictionary<string, dynamic>()
                    {
                        { "commentId", id },
                        { "newContent", content },
                        { "editTime", DateTime.Now }
                    });

                    return result ? Ok("Comment edited OK!") : StatusCode(StatusCodes.Status500InternalServerError, "Error in server side editing comment!");
                } else
                {
                    return StatusCode(StatusCodes.Status403Forbidden, "No permission to delete this comment!");
                }
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song with given ID does not exist!");
            }
        }

        [Route("getAllOnSong/{songId}")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<JsonResult> GetAllCommentsOnSong(int songId)
        {
            var idConds = new Dictionary<string, dynamic>() { { "id", songId } };
            var songObjects = await _connection.Read("song", idConds);
            var doesSongExist = songObjects.Count != 0;

            if (doesSongExist)
            {
                return new JsonResult(await _connection.CallReadProcedure("ListCommentsOfSong", new Dictionary<string, dynamic>()
                {
                    { "id", songId }
                }));
            }
            else
            {
                return new JsonResult("Song with given ID does not exist!")
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }
        }

        // [Route("get")]
        // [HttpGet]
        // public async Task<ActionResult<SongComment>> GetComments(int id)
        // {
        //     var result = await _database.Read("comment", new Dictionary<string, dynamic>()
        //     {
        //         { "song", id }
        //     });
        //     
        // }
    }
}
