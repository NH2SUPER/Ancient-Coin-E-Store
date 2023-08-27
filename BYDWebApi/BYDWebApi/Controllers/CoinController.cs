using Microsoft.AspNetCore.Mvc;
using BYDWebApi.Services;
using BYDWebApi.DTO.User;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using BYDWebApi.DTO.BYDCoin;

namespace BYDWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoinController : ControllerBase
    {

        [HttpGet("getrefercoins", Name = "GetReferCoins")]
        public IEnumerable<Coin> GetReferCoins()
        {
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.GetReferCoins();
            return coins;
        }

        [HttpGet("getNews", Name = "GetNews")]
        public IEnumerable<CoinNews> getNews()
        {
            CoinService coinService = new CoinService();
            List<CoinNews> coins = coinService.GetNews();
            return coins;
        }

        [HttpGet]
        [Route("getCompanyCoins")]
        public IEnumerable<Coin> getCompanyCoins([FromQuery] int companyId) 
        {
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.getCompanyCoins(companyId);
            return coins;
        }

        [HttpPost]
        [Route("getCompanyCoinsByPage")]
        public IEnumerable<Coin> getCompanyCoins_Page([FromBody] CoinPara coinPara)
        {
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.getCompanyCoins_Page(coinPara);
            return coins;
        }

        [HttpPost]
        [Route("getCoinsByPage")]
        public IEnumerable<Coin> getCoinsByPage([FromBody] CoinPara coinPara)
        {
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.getCoinsByPage(coinPara, coinPara.Skip, coinPara.PageSize);
            return coins;
        }


        [HttpGet]
        [Route("getCoinImageById")]
        public IEnumerable<CoinImage> getCoinImageById([FromQuery] int coinId)
        {
            CoinService coinService = new CoinService();
            List<CoinImage> coinImages = coinService.getCoinImageById(coinId);
            return coinImages;
        }

        

        [HttpGet]
        [Route("getMyWatchList")]
        public IEnumerable<Coin> getMyWatchList([FromQuery] int userId)
        {
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.getMyWatchList(userId);
            return coins;
        }

        [HttpGet]
        [Authorize]
        [Route("getUserOffer")]
        public IEnumerable<Coin> getUserOffer([FromQuery]int userId)
        {
            CoinService coinService = new CoinService();
            List<Coin> myCoinOffers = coinService.getUserOffer(userId);
            return myCoinOffers;
        }

        [HttpPost]
        [Authorize]
        [Route("AcceptOffer")]
        public IActionResult AcceptOffer([FromBody]CoinOffer coinOffer)
        {
            CoinService coinService = new CoinService();
            int result = coinService.AcceptOffer(coinOffer);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("getUserOrder")]
        public IEnumerable<Coin> getUserOrder([FromQuery] int userId)
        {
            CoinService coinService = new CoinService();
            List<Coin> myCoinOffers = coinService.getUserOrder(userId);
            return myCoinOffers;
        }

        [HttpGet]
        [Authorize]
        [Route("getUserCoins")]
        public IEnumerable<UserCoin> getUserCoins([FromQuery] int userId)
        {
            CoinService coinService = new CoinService();
            List<UserCoin> userCoins = coinService.getUserCoins(userId);
            return userCoins;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(List<IFormFile> files)
        {
            // Check if any file is null or not
            if (files == null || files.Count == 0)
            {
                return BadRequest("Files not selected");
            }

            var uploadedFiles = new List<object>();

            // Save each file to a file system
            foreach (var file in files)
            {
                if (file.Length == 0)
                {
                    continue;
                }

                var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                var filePath = "";
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                uploadedFiles.Add(new { name = file.FileName, size = file.Length, url = $"/uploads/{fileName}" });
            }

            // Return a JSON response with the file information
            return Ok(uploadedFiles);
        }

        [Authorize]
        [HttpPost("addNewCoin")]
        public IEnumerable<Coin> AddNewCoin(Coin newCoin)
        {
            int userId = newCoin.UserId;
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.AddNewCoin(newCoin, userId);
            return coins;
        }


        [HttpPost("modifyCoin")]
        public IEnumerable<Coin> ModifyCoin(Coin coin)
        {
            int userId = coin.UserId;
            CoinService coinService = new CoinService();
            List<Coin> coins = coinService.ModifyCoin(coin, userId);
            return coins;
        }


        [HttpPost("removeCoin")]
        [Authorize]
        public IActionResult RemoveCoin([FromBody]CoinPara coinPara)
        {
            int userId = 1;
            CoinService coinService = new CoinService();
            coinService.RemoveCoin(coinPara.CoinId, userId);
            return Ok(1);
        }
    }
}
