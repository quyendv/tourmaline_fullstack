using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly FollowServices _followServices;
        private readonly UserServices _userServices;

        public FollowController(FollowServices followServices, UserServices userServices)
        {
            _followServices = followServices;
            _userServices = userServices;
        }

        private string CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        [Route("add")]
        [HttpPut]
        public async Task<ActionResult> Follow(string username)
        {
            if (CurrentSessionUsername == username || !await _userServices.DoesUserExist(username))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            await _followServices.AddFollow(CurrentSessionUsername, username);
            return Ok();
        }

        [Route("remove")]
        [HttpDelete]
        public async Task<ActionResult> Unfollow(string username)
        {
            if (CurrentSessionUsername == username || !await _userServices.DoesUserExist(username))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            await _followServices.RemoveFollow(CurrentSessionUsername, username);
            return Ok();
        }

        [Route("followers")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<User>>> GetFollowers(string username)
        {
            if (!await _userServices.DoesUserExist(username))
            {
                return StatusCode(StatusCodes.Status400BadRequest, "User does not exist!");
            }
            return Ok(await _followServices.GetFollowers(CurrentSessionUsername));
        }
        
        [Route("followings")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<User>>> GetFollowings(string username)
        {
            if (!await _userServices.DoesUserExist(username))
            {
                return StatusCode(StatusCodes.Status400BadRequest, "User does not exist!");
            }
            return Ok(await _followServices.GetFollowings(CurrentSessionUsername));
        }
    }
}
