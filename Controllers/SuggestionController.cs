using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Route("api/[controller]")]
[Authorize]
[ApiController]
public class SuggestionController : ControllerBase
{
    public SuggestionController(SuggestionServices suggestionServices)
    {
        _suggestionServices = suggestionServices;
    }

    private readonly SuggestionServices _suggestionServices;

    private string? Username => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [Route("getNew")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<Dictionary<string, dynamic>> GetNew()
    {
        return new Dictionary<string, dynamic>()
        {
            {
                "result", await _suggestionServices.GetNew()
            }
        };
    }

    [Route("getTop50")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<Dictionary<string, dynamic>> GetTop50()
    {
        return new Dictionary<string, dynamic>()
        {
            {
                "result", await _suggestionServices.GetTop50()
            }
        };
    }

    [Route("getRecentPlays")]
    [HttpGet]
    public async Task<ActionResult<List<Song>>> GetRecentlyPlayed()
    {
        if (Username == null)
        {
            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        return Ok(await _suggestionServices.GetRecentPlays(Username));
    }

    [Route("getRecentlyUploaded")]
    [HttpGet]
    public async Task<ActionResult<List<Song>>> GetRecentlyUploaded()
    {
        if (Username == null)
        {
            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        return Ok(await _suggestionServices.GetRecentUploads(Username));
    }

    [Route("getRelatedArtist")]
    [HttpGet]
    public async Task<ActionResult<List<User>>> GetRelatedArtist()
    {
        if (Username == null)
        {
            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        return Ok(await _suggestionServices.GetRelatedArtist(Username));
    }

    [Route("getSuggestion")]
    [HttpGet]
    public async Task<ActionResult<List<Song>>> GetSuggestion()
    {
        if (Username == null)
        {
            return StatusCode(StatusCodes.Status401Unauthorized);
        }

        return Ok(await _suggestionServices.GetSongSuggestions(Username));
    }
}