using BYDWebApi.DTO;
using BYDWebApi.DTO.User;
using BYDWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.Design;
using System.Security.Claims;

namespace BYDWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost("addNewUser", Name = "AddNewUser")]
        public IActionResult AddNewUser(DTO.User.User newUser)
        {
            UserService userService = new UserService();
            string result = userService.AddNewUser(newUser);
            return Ok(result);
        }

        [HttpGet]
        [Route("checkUserExisted")]
        public IActionResult checkUserExisted([FromQuery] string userEmail)
        {
            UserService userService = new UserService();
            int result = userService.checkUserExisted(userEmail);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserProfile")]
        public IActionResult GetUserProfile()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var userClaims = identity.Claims;
                var userEmail = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                UserService userService = new UserService();
                User user = userService.GtUserProfile(userEmail);
                return Ok(user);
            } else {
                return Ok(-1);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateUserProfile")]
        public IActionResult UpdateUserProfile(DTO.User.User user)
        {
            UserService userService = new UserService();
            string result = userService.UpdateUserProfile(user);
            return Ok(result);
        }


        [HttpPost]
        [Authorize]
        [Route("AddCoinToWatchlist")]
        public IActionResult AddCoinToWatchlist(WatchCoin watchCoin)
        {
            UserService userService = new UserService();
            List<int> result = userService.AddCoinToWatchlist(watchCoin);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("RemoveCoinFromWatchlist")]
        public IActionResult RemoveCoinFromWatchlist(WatchCoin watchCoin)
        {
            UserService userService = new UserService();
            List<int> result = userService.RemoveCoinFromWatchlist(watchCoin);
            return Ok(result);
        }

        [HttpPost]
        [Authorize]
        [Route("SendOffer")]
        public IActionResult SendOffer(CoinOffer coinOffer)
        {
            UserService userService = new UserService();
            int result = userService.SendOffer(coinOffer);
            return Ok(result);
        }

        [HttpPost]
        [Route("forgetPassword")]
        public IActionResult forgetPassword([FromBody] UserBase userBase)
        {
            UserService userService = new UserService();
            string currentUrl = "ResetPassword?guid=";
            if (HttpContext.Request.Host.ToString().ToLower().IndexOf("localhost") > -1)
            {
                currentUrl = "http://localhost:4200/" + currentUrl;
            }
            if (HttpContext.Request.Host.ToString().ToLower().IndexOf("10.0.0.120") > -1)
            {
                currentUrl = "http://10.0.0.120/byd/" + currentUrl;
            }
            if (HttpContext.Request.Host.ToString().ToLower().IndexOf("99.255.206.231") > -1)
            {
                currentUrl = "http://99.255.206.231/byd/" + currentUrl;
            }
            int result = userService.forgetPassword(userBase.Username, currentUrl);
            return Ok();
        }

        [HttpPost]
        [Route("changePassword")]
        public IActionResult changePassword([FromBody] UserNewPassword userNewPassword)
        {
            UserService userService = new UserService();
            int result = userService.changePassword(userNewPassword);
            return Ok(result);
        }
    }
}
