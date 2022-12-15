using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<Dictionary<string, dynamic>> Search(string query)
        {
            var result = await _searchServices.Search(query);
            return new Dictionary<string, dynamic>() {{"result", result}};
        }
    }
}
