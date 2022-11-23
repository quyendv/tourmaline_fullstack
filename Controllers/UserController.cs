using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using tourmaline.Models;
using tourmaline.Services;

namespace tourmaline.Controllers
{
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
            private readonly DbConnection _connection;
        private readonly IConfiguration _configuration;

        public static readonly string IsAdminClaimName = "IsAdmin";

    public UserController(DbConnection connection, IConfiguration configuration)
    {
        _connection = connection;
        _configuration = configuration;
    }

    [Route("api/[controller]/getUser/{username}")]
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<User>> GetUser(string username)
    {
        var result = await _connection.Read("user",
            new Dictionary<string, dynamic>() { { "username", username } });
        User user = null;
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
    [Route("api/[controller]/signup")]
    [AllowAnonymous]
    public async Task<ActionResult> AddNewUser()
    {
        var info = await Request.ReadFromJsonAsync<LoginModel>();
        if (info == null)
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "Incorrect request body!");
        }
        
        var isUsernameExist = (await _connection.Read(
                "user",
                new Dictionary<string, dynamic>() { { "username", info.Username } },
                new List<string>() { "username" })
            ).Count != 0;
        if (isUsernameExist)
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "User is already exist!");
        }

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
        {
            return StatusCode(StatusCodes.Status201Created, user);
        }
        else
        {
            return StatusCode(StatusCodes.Status400BadRequest, "Cannot create user!");
        }
    }

    [HttpPost]
    [Route("api/[controller]/editProfile")]
    public Task<ActionResult> EditProfile([FromBody] User user)
    {
        if (user.Username == null)
        {
            return Task.FromResult<ActionResult>(StatusCode(StatusCodes.Status400BadRequest));
        }

        return Task.FromResult<ActionResult>(StatusCode(StatusCodes.Status201Created));
    }

    [HttpPost]
    [Route("api/[controller]/login")]
    [AllowAnonymous]
    public async Task<ActionResult> Login()
    {
        var loginModel = await Request.ReadFromJsonAsync<LoginModel>();
        if (loginModel == null)
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "Incorrect request body!");
        }

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
            PasswordVerificationResult verificationResult = hasher.VerifyHashedPassword(user, result[0]["password"], loginModel.Password);

            if (verificationResult == PasswordVerificationResult.Success || verificationResult == PasswordVerificationResult.SuccessRehashNeeded)
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
                    Expires = DateTime.UtcNow.AddMinutes(5),
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
    }
}
