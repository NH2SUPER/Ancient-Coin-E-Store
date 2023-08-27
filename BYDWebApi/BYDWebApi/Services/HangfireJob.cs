using Dapper;
using System.ComponentModel.Design;
using System.Data.SqlClient;
using System.Data;
using BYDWebApi.DTO.BYDCoin;

namespace BYDWebApi.Services
{
    public class HangfireJob
    {
        public string _ConnectString;
        public string _WebApiUrl;

        public HangfireJob()
        {
            _ConnectString = "Server=WINSVR2022-BYD; Initial Catalog=BYD;User ID=intranetuser;Password=devel0per;Connect Timeout=90";

            var configuration = new ConfigurationBuilder().SetBasePath(AppContext.BaseDirectory).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true).Build();
            _WebApiUrl = configuration.GetValue<string>("WebApiUrl");
        }

        public async Task<string> YourMethodToRunDaily()
        {

            await SendMessageAsync("Refresh Coin Price at " + DateTime.Now.ToString());
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //check each coin status
                DynamicParameters param = new DynamicParameters();
                var result = _db.QueryMultiple("dbo.Job_Coin_Update", param, commandType: CommandType.StoredProcedure);
                List<Coin> coins = result.Read<Coin>().ToList();
                foreach (Coin coin in coins)
                {
                    string coinInfo = "{'CoinId':'" + coin.CoinId.ToString() + "','CurrentPrice':'" + coin.CurrentPrice + "'}";
                    await SendMessageAsync(coinInfo);
                }

                return "";
            }
        }

        public async Task<string> SendMessageAsync(string message)
        {
            using (HttpClient client = new HttpClient())
            {
                string apiUrl = _WebApiUrl + "/api/Scheduler/SendMessage?message=" + message;

                // Set any required headers or parameters
                // client.DefaultRequestHeaders.Add("Authorization", "Bearer <token>");

                // Make the API call
                HttpResponseMessage response = client.PostAsync(apiUrl, null).Result;

                if (response.IsSuccessStatusCode)
                {
                    // Process the API response
                    return response.Content.ReadAsStringAsync().Result;
                    // ... Handle the response as needed
                }
                else
                {
                    return response.StatusCode.ToString();
                }
            }
        }
    }
}
