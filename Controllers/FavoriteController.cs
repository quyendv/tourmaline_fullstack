using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        public FavoriteController(Database database)
        {
            _database = database;
        }

        private readonly Database _database;

        [Route("add")]
        [HttpPut]
        public async Task<ActionResult> AddToFavorite(int id)
        {
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var isSongExist = (await _database.Read("song", new Dictionary<string, dynamic>()
            {
                { "id", id }
            })).Count != 0;
            if (!isSongExist)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song not found!");
            }

            await _database.Add("favorites", new Dictionary<string, dynamic>()
            {
                { "userid", username },
                { "songid", id }
            });
            return Ok();
        }

        [Route("remove")]
        [HttpDelete]
        public async Task<ActionResult> RemoveFromFavorite(int id)
        {
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var isSongExist = (await _database.Read("song", new Dictionary<string, dynamic>()
            {
                { "id", id }
            })).Count != 0;
            if (!isSongExist)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song not found!");
            }

            await _database.Delete("favorites", new Dictionary<string, dynamic>()
            {
                { "userid", username },
                { "songid", id }
            });
            return Ok();
        }

        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<Favorites>> GetFavorite()
        {
            var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var result = await _database.Read("favorites", new Dictionary<string, dynamic>()
            {
                { "userid", username }
            }, new List<string>()
            {
                "songid"
            });
            var favorite = new Favorites(username);
            foreach (var songId in result.Select(s => s["songid"]))
            {
                var songQuery = (await _database.Read("song", new Dictionary<string, dynamic>()
                {
                    { "id", songId }
                })).First();
                favorite.Songs.Add(new Song
                {
                    Id = songId,
                    Description = songQuery["description"],
                    Name = songQuery["name"],
                    UploadTime = songQuery["uploadTime"],
                    Uploader = songQuery["uploader"]
                });
            }

            return Ok(favorite);
        }

        [Route("getTop")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<JsonResult> GetTopFavorites()
        {
            return new JsonResult(await _database.CallReadProcedure("ListTopFavorites", new Dictionary<string, dynamic>()));
        }
    }
}