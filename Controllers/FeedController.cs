using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedController : ControllerBase
    {
        private readonly FeedServices _feedServices;

        public FeedController(FeedServices feedServices)
        {
            _feedServices = feedServices;
        }

        private string? CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Song>>> GetFeed()
        {
            if (CurrentSessionUsername == null)
            {
                return StatusCode(StatusCodes.Status401Unauthorized);
            }

            return Ok(await _feedServices.GetRecentUploads(CurrentSessionUsername));
        }
    }
}
