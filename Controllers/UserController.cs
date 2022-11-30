using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
            user = new User(result[0]["username"], result[0]["isAdmin"] == 1);
            user.Name = result[0]["name"];
            user.Bio = result[0]["bio"];
            user.CreateTime = result[0]["createTime"];
            user.Birth = result[0]["birth"];
            user.Gender = result[0]["gender"] == 0;
            user.Email = result[0]["email"];
        }

        if (user != null)
            return Ok(user);
        return StatusCode(StatusCodes.Status404NotFound);
    }

    [HttpPost]
    [Route("signup")]
    [AllowAnonymous]
    public async Task<ActionResult> AddNewUser()
    {
        var info = await Request.ReadFromJsonAsync<LoginModel>();
        if (info == null) return StatusCode(StatusCodes.Status406NotAcceptable, "Incorrect request body!");

        var isUsernameExist = (await _connection.Read(
                "user",
                new Dictionary<string, dynamic>() { { "username", info.Username } },
                new List<string>() { "username" })
            ).Count != 0;
        if (isUsernameExist) return StatusCode(StatusCodes.Status406NotAcceptable, "User is already exist!");

        var user = new User(info.Username);
        var hasher = new PasswordHasher<User>();
        info.Password = hasher.HashPassword(user, info.Password);
        var result = await _connection.Add("user", new Dictionary<string, dynamic>()
        {
            { "username", user.Username },
            { "password", info.Password },
            { "createTime", user.CreateTime.ToString("yyyy-MM-dd H:mm:ss") },
            { "isAdmin", user.IsAdmin ? 1 : 0 },
            { "name", user.Name },
            { "bio", user.Bio },
            { "birth", user.Birth.ToString("yyyy-MM-dd H:mm:ss") },
            { "gender", user.Gender ? 1 : 0 },
            { "email", user.Email }
        });
        if (result)
            return StatusCode(StatusCodes.Status201Created, user);
        else
            return StatusCode(StatusCodes.Status400BadRequest, "Cannot create user!");
    }

    [HttpPut]
    [Route("edit")]
    public async Task<ActionResult> EditProfile()
    {
        var info = await Request.ReadFromJsonAsync<EditProfileModel>();
        if (info == null) return StatusCode(StatusCodes.Status406NotAcceptable, "Incorrect request body!");

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
    public async Task<ActionResult> Login()
    {
        var loginModel = await Request.ReadFromJsonAsync<LoginModel>();
        if (loginModel == null) return StatusCode(StatusCodes.Status406NotAcceptable, "Incorrect request body!");

        var result = await _connection.Read("user",
            new Dictionary<string, dynamic>() { { "username", loginModel.Username } });
        if (result.Count != 0)
        {
            var user = new User();
            user.Username = result.First()["username"];
            user.Bio = result.First()["bio"];
            user.Birth = result.First()["birth"];
            user.Email = result.First()["email"];
            user.Gender = result.First()["gender"] == 1;
            user.Name = result.First()["name"];
            user.CreateTime = result.First()["createTime"];
            user.IsAdmin = result.First()["isAdmin"] == 1;

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

        return StatusCode(StatusCodes.Status406NotAcceptable, "User not found!");
    }

    [HttpGet]
    [AllowAnonymous]
    [Route("find")]
    public async Task<JsonResult> FindUsers(string keyword)
    {
        return new JsonResult(await _connection.CallFindProcedure("FindUsers", keyword));
    }
}