using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SearchController : ControllerBase
    {
        private readonly SearchServices _searchServices;

        public SearchController(SearchServices searchServices)
        {
            _searchServices = searchServices;
        }
        
        [HttpGet]
        [Route("")]
        public async Task<string> Search(string query)
        {
            var result = await _searchServices.Search(query);
            return new JsonResult(result).ToJson();
        }
    }
}
