using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    private readonly Database _connection;
    private readonly IConfiguration _configuration;

    public static readonly string IsAdminClaimName = "IsAdmin";

    private bool CanCurrentUserModifyThisUser(string username)
    {
        var isAdminClaim = HttpContext.User.FindFirst(UserController.IsAdminClaimName);
        if (isAdminClaim != null && bool.Parse(isAdminClaim.Value)) return true;

        return username == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value!;
    }

    public UserController(Database connection, IConfiguration configuration)
    {
        _connection = connection;
        _configuration = configuration;
    }

    [Route("getUser/{username}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<User>> GetUser(string username)
    {
        var result = await _connection.Read("user",
            new Dictionary<string, dynamic>() { { "username", username } });
        User? user = null;
        if (result.Count != 0)
        {
            user = new User(result[0]["username"], result[0]["isAdmin"] == 1)
            {
                Name = result[0]["name"],
                Bio = result[0]["bio"],
                CreateTime = result[0]["createTime"],
                Birth = result[0]["birth"],
                Gender = result[0]["gender"] == 0,
                Email = result[0]["email"]
            };
        }

        if (user != null)
            return Ok(user);
        return StatusCode(StatusCodes.Status404NotFound);
    }

    [HttpPost]
    [Route("signup")]
    [AllowAnonymous]
    public async Task<ActionResult> SignUp([FromForm] string username, [FromForm] string password)
    {
        var isUsernameExist = (await _connection.Read(
                "user",
                new Dictionary<string, dynamic>() { { "username", username } },
                new List<string>() { "username" })
            ).Count != 0;
        if (isUsernameExist) return StatusCode(StatusCodes.Status406NotAcceptable, "User is already exist!");

        var user = new User(username);
        var hasher = new PasswordHasher<User>();
        password = hasher.HashPassword(user, password);
        var result = await _connection.Add("user", new Dictionary<string, dynamic>()
        {
            { "username", user.Username },
            { "password", password },
            { "createTime", user.CreateTime.ToString("yyyy-MM-dd H:mm:ss") },
            { "isAdmin", user.IsAdmin ? 1 : 0 },
            { "name", user.Name },
            { "bio", user.Bio },
            { "birth", user.Birth.ToString("yyyy-MM-dd H:mm:ss") },
            { "gender", user.Gender ? 1 : 0 },
            { "email", user.Email }
        });
        return result ? StatusCode(StatusCodes.Status201Created, user) : StatusCode(StatusCodes.Status400BadRequest, "Cannot create user!");
    }

    [HttpPut]
    [Route("edit")]
    public async Task<ActionResult> EditProfile([FromBody] User info)
    {
        var userNameMatchCond = new Dictionary<string, dynamic>() { { "username", info.Username } };
        var doesUserExist = (await _connection.Read("user", userNameMatchCond)).Count != 0;

        if (!doesUserExist)
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "User not found!");
        }

        if (!CanCurrentUserModifyThisUser(info.Username))
        {
            return StatusCode(StatusCodes.Status403Forbidden, "Current user does not have the required permission to edit the targeted user's profile!");
        }

        var result = await _connection.CallUpdateProcedure("EditUserProfile", new Dictionary<string, dynamic>()
        {
            { "username", info.Username },
            { "newName", info.Name },
            { "newBio", info.Bio },
            { "newBirth", info.Birth },
            { "newGender", info.Gender },
            { "newEmail", info.Email },
            { "newIsAdmin", info.IsAdmin }
        });

        if (!result)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error occured on server side updating profile!");
        }

        return Ok();
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login([FromForm] LoginModel loginModel)
    {
        var result = await _connection.Read("user",
            new Dictionary<string, dynamic>() { { "username", loginModel.Username } });
        if (result.Count == 0) return StatusCode(StatusCodes.Status406NotAcceptable, "User not found!");
        var user = new User
        {
            Username = result.First()["username"],
            Bio = result.First()["bio"],
            Birth = result.First()["birth"],
            Email = result.First()["email"],
            Gender = result.First()["gender"] == 1,
            Name = result.First()["name"],
            CreateTime = result.First()["createTime"],
            IsAdmin = result.First()["isAdmin"] == 1
        };

        var hasher = new PasswordHasher<User>();
        PasswordVerificationResult verificationResult =
            hasher.VerifyHashedPassword(user, result[0]["password"], loginModel.Password);

        if (verificationResult is PasswordVerificationResult.Success or PasswordVerificationResult.SuccessRehashNeeded)
        {
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, loginModel.Username),
                    new Claim(JwtRegisteredClaimNames.Jti,
                        Guid.NewGuid().ToString()),
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

    [HttpGet]
    [AllowAnonymous]
    [Route("find")]
    public async Task<JsonResult> FindUsers(string keyword)
    {
        return new JsonResult(await _connection.CallFindProcedure("FindUsers", keyword));
    }
}