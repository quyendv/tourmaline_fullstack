using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Differencing;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserServices _services;
    private readonly IConfiguration _configuration;

    public const string IsAdminClaimName = "IsAdmin";

    private string? CurrentSessionUsername => HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    public UserController(UserServices services, IConfiguration configuration)
    {
        _services = services;
        _configuration = configuration;
    }

    [Route("getUser/{username}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<User>> GetUser(string username)
    {
        if (await _services.IsUserExist(username))
        {
            return await _services.GetUser(username);
        }
        
        return StatusCode(StatusCodes.Status404NotFound);
    }

    [HttpGet]
    [Route("getAvatar")]
    [AllowAnonymous]
    public async Task<ActionResult> GetAvatar(string username)
    {
        if (!await _services.IsUserExist(username))
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "User not found!");
        }

        var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
        var filePath = $"{homeDir}/storage/avatar/{username}.png";

        if (!System.IO.File.Exists(filePath))
        {
            // Returns default file
            filePath = "Assets/defaultAvatar.png";
        }

        var file = new FileStream(filePath, FileMode.Open, FileAccess.Read,
            FileShare.Read, 2048,
            true);

        return File(file, "image/jpeg", true);
    }

    [HttpPost]
    [Route("setAvatar")]
    public async Task<ActionResult> SetAvatar([FromForm] IFormFile file)
    {
        try
        {
            var homeDir = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            Directory.CreateDirectory($"{homeDir}/storage/avatar");
            var fileName = $"{CurrentSessionUsername}.png";
            var filePath = Path.Combine($"{homeDir}/storage/avatar", fileName);
            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);
            return Ok("Upload success!");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }

        return StatusCode(StatusCodes.Status500InternalServerError);
    }

    [HttpPost]
    [Route("signup")]
    [AllowAnonymous]
    public async Task<ActionResult> SignUp([FromForm] string username, [FromForm] string password,
        [FromForm] string fullname, [FromForm] bool gender, [FromForm] string email)
    {
        if (await _services.IsUserExist(username)) return StatusCode(StatusCodes.Status406NotAcceptable, "User is already exist!");

        var user = new User(username)
        {
            Email = email,
            Gender = gender,
            Name = fullname
        };

        var hasher = new PasswordHasher<User>();
        password = hasher.HashPassword(user, password);
        await _services.AddUser(user, password);
        return StatusCode(StatusCodes.Status201Created, user);
    }

    [HttpPut]
    [Route("edit")]
    public async Task<ActionResult> EditProfile(string username, string? name, string? bio, bool? gender, string? email, DateTime? birth)
    {
        if (!await _services.IsAdmin(CurrentSessionUsername!) && username != CurrentSessionUsername)
        {
            return StatusCode(StatusCodes.Status403Forbidden);
        }
        await _services.EditInfo(username, name, bio, gender, birth);
        return Ok();
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login([FromForm] LoginModel loginModel)
    {
        if (!await _services.IsUserExist(loginModel.Username)) return StatusCode(StatusCodes.Status406NotAcceptable, "User not found!");
        var user = await _services.GetUser(loginModel.Username);

        var hasher = new PasswordHasher<User>();
        var verificationResult =
            hasher.VerifyHashedPassword(user, await _services.GetPassword(loginModel.Username), loginModel.Password);

        if (verificationResult is PasswordVerificationResult.Success or PasswordVerificationResult.SuccessRehashNeeded)
        {
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, loginModel.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(IsAdminClaimName, user.IsAdmin.ToString())
                }),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(tokenHandler.WriteToken(token));
        }
        else
        {
            return StatusCode(StatusCodes.Status403Forbidden, "User password is incorrect!");
        }

    }
}