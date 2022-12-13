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
        public FavoriteController(FavoriteServices favoriteServices, SongServices songServices)
        {
            _favoriteServices = favoriteServices;
            _songServices = songServices;
        }

        private readonly FavoriteServices _favoriteServices;
        private readonly SongServices _songServices;
        
        private string? CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        [Route("add")]
        [HttpPut]
        public async Task<ActionResult> AddToFavorite(long id)
        {
            if (!await _songServices.IsSongExist(id))
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song doesn't exist!");
            }

            await _favoriteServices.AddToFavorite(CurrentSessionUsername!, id);
            return Ok();
        }

        [Route("remove")]
        [HttpDelete]
        public async Task<ActionResult> RemoveFromFavorite(long id)
        {
            if (!await _songServices.IsSongExist(id))
            {
                return StatusCode(StatusCodes.Status404NotFound, "Song doesn't exist!");
            }

            await _favoriteServices.RemoveFromFavorite(CurrentSessionUsername!, id);
            return Ok();        }

        [Route("get")]
        [HttpGet]
        public async Task<ActionResult<Favorites>> GetFavorite()
        {
            return Ok(new Favorites
            {
                Songs = await _favoriteServices.GetFavorites(CurrentSessionUsername!),
            });
        }

        // [Route("getTop")]
        // [HttpGet]
        // [AllowAnonymous]
        // public async Task<JsonResult> GetTopFavorites()
        // {
        //     return new JsonResult(await _database.CallReadProcedure("ListTopFavorites", new Dictionary<string, dynamic>()));
        // }
    }
}