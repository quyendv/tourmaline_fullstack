using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace tourmaline.Controllers
{
    [Route("")]
    [ApiController]
    [Authorize]
    public class RootController : ControllerBase
    {
        public RootController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IConfiguration _configuration;
    
        [HttpGet]
        [AllowAnonymous]
        public Task<ActionResult<string>> HelloWorld()
        {
            return Task.FromResult<ActionResult<string>>(Ok("Hello World!"));
        }
    }
}
