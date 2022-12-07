using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            _database = database;
        }
        private readonly Database _database;

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
