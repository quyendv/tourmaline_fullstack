using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        public SuggestionController(Database database)
        {
            _database = database;
        }
        
        private readonly Database _database;

        [Route("get")]
        [HttpGet]
        public Task<ActionResult<Suggestion>> GetSuggestion()
        {
            var suggestion = new Suggestion();
            suggestion.RecentlyPlayed = GetRecentlyPlayed();
            suggestion.RecentlyUploaded = GetRecentlyUploaded();
            suggestion.Top50 = GetTop50();
            return Task.FromResult<ActionResult<Suggestion>>(Ok(suggestion));
        }

        private string _username => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

        [Route("recentUpload")]
        [HttpGet]
        private List<Song> GetRecentlyUploaded()
        {
            var result = new List<Song>();
            return result;
        }
        
        [Route("recentPlay")]
        [HttpGet]
        private List<Song> GetRecentlyPlayed()
        {
            var result = new List<Song>();
            return result;
        }
        
        [Route("top50")]
        [HttpGet]
        private List<Song> GetTop50()
        {
            var result = new List<Song>();
            return result;
        }
    }
}
