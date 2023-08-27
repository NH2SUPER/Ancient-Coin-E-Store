using BYDJWTToken.Models;
using BYDJWTToken.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BYDJWTToken.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        public LoginController(IConfiguration config)
        {
            _config = config;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login([FromBody] UserBase userLogin)
        {
            if (Authenticate(userLogin)>0)
            {
                var token = GenerateToken(userLogin);

                //save user token
                UserService userService = new UserService();
                userService.SaveUserToken(userLogin.Username, token);

                return Ok(token);
            }
            else
                return Ok(-1);
        }

        // To generate token
        private string GenerateToken(UserBase user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Username)
                //,new Claim(ClaimTypes.Role,"user")
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);


            return new JwtSecurityTokenHandler().WriteToken(token);

        }

        //To authenticate user
        private int Authenticate(UserBase userLogin)
        {
            BYDJWTToken.Services.UserService userService = new Services.UserService();
            return userService.CheckUser(userLogin);
        }
    }
}
