using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
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
        public CommentController(CommentServices commentServices, SongServices songServices)
        {
            _commentServices = commentServices;
            _songServices = songServices;
        }

        private readonly CommentServices _commentServices;
        private readonly SongServices _songServices;

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
            if (await _songServices.DoesSongExist(id))
            {
                var currentDate = DateTime.Now;

                Comment comment = new Comment(-1, content, id, CurrentSessionUsername)
                {
                    CreateTime = currentDate,
                    LastEditedTime = currentDate
                };

                comment.Id = await _commentServices.Post(comment);

                if (comment.Id >= 0)
                {
                    return Ok(comment);
                }
                
                return StatusCode(StatusCodes.Status500InternalServerError, "Error in server side posting comment!");
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
            if (await _commentServices.DoesCommentExist(commentId))
            {
                if (CanCurrentUserModifyComment(await _commentServices.GetCommenter(commentId)))
                {
                    var result = await _commentServices.DeleteComment(commentId);
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
            if (await _commentServices.DoesCommentExist(id))
            {
                Comment comment = await _commentServices.GetComment(id);

                if (CanCurrentUserModifyComment(comment.UserName))
                {
                    comment.LastEditedTime = DateTime.Now;
                    comment.Content = content;

                    var result = await _commentServices.UpdateComment(id, content, comment.LastEditedTime);

                    if (result)
                    {
                        return Ok(comment);
                    }

                    return StatusCode(StatusCodes.Status500InternalServerError, "Error in server side editing comment!");
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
            if (await _songServices.DoesSongExist(songId))
            {
                return new JsonResult(await _commentServices.ListAllCommentsOnSong(songId));
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
