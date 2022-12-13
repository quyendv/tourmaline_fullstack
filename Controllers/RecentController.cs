using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Authorize]
[ApiController]
public class RecentController : ControllerBase
{
    public RecentController(RecentServices services)
    {
        _services = services;
    }

    private readonly RecentServices _services;

    private string? CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [HttpGet]
    [Route("api/[controller]/recents")]
    public async Task<ActionResult<Recents>> GetRecentSongs()
    {
        return Ok(new Recents
        {
            RecentSongs = await _services.GetRecent(CurrentSessionUsername!),
        });
    }
}