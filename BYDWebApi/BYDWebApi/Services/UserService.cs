using Dapper;
using System.Data.SqlClient;
using System.Data;
using BCrypt.Net;
using BYDWebApi.DTO.User;
using BYDWebApi.DTO.BYDCoin;

namespace BYDWebApi.Services
{
    public class UserService
    {
        public string _ConnectString;
        public UserService()
        {
            _ConnectString = "Server=WINSVR2022-BYD; Initial Catalog=BYD;User ID=intranetuser;Password=devel0per;Connect Timeout=90";
        }

        public string AddNewUser(DTO.User.User newUser)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@Email", newUser.Email);
                param.Add("@FirstName", newUser.FirstName);
                param.Add("@LastName", newUser.LastName);
                param.Add("@Password", BCrypt.Net.BCrypt.HashPassword(newUser.Password));
                param.Add("@Phone", newUser.Phone);
                param.Add("@Mobile", newUser.Mobile);
                param.Add("@Address1", newUser.Address1);
                param.Add("@Address2", newUser.Address2);
                param.Add("@City", newUser.City);
                param.Add("@Province", newUser.Province);
                param.Add("@PostalCode", newUser.PostalCode);
                param.Add("@Country", newUser.Country);

                List <Coin> coins = _db.Query<Coin>("dbo.User_Add", param, commandType: CommandType.StoredProcedure).ToList();

                return "Succeeded";
            }
        }

        public string UpdateUserProfile(DTO.User.User user)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@Email", user.Email);
                param.Add("@FirstName", user.FirstName);
                param.Add("@LastName", user.LastName);
                param.Add("@Password", BCrypt.Net.BCrypt.HashPassword(user.Password));
                param.Add("@Phone", user.Phone);
                param.Add("@Mobile", user.Mobile);
                param.Add("@Address1", user.Address1);
                param.Add("@Address2", user.Address2);
                param.Add("@City", user.City);
                param.Add("@Province", user.Province);
                param.Add("@PostalCode", user.PostalCode);
                param.Add("@Country", user.Country);

                List<Coin> coins = _db.Query<Coin>("dbo.User_Update", param, commandType: CommandType.StoredProcedure).ToList();

                return "Succeeded";
            }
        }

        public int checkUserExisted(string userEmail)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //send reset password email to user
                string guidString = Guid.NewGuid().ToString();
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserEmail", userEmail);
                param.Add("@IsExisted", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _db.Execute("dbo.User_Email_Check", param, commandType: CommandType.StoredProcedure);
                int outputId = param.Get<int>("@IsExisted");

                return outputId;
            }
        }

        public bool VerifyPassword(string username, string passwordToCheck)
        {
            // Retrieve the stored hashed password from the database for the given username
            string storedHashedPassword = "GetStoredHashedPassword(username)";

            // Verify the provided password against the stored hashed password
            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(passwordToCheck, storedHashedPassword);

            return isPasswordValid;
        }

        public User GtUserProfile(string userEmail)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserEmail", userEmail);
                //User currentUser = _db.Query<User>("dbo.User_Profile_Get", param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                var result = _db.QueryMultiple("dbo.User_Profile_Get", param, commandType: CommandType.StoredProcedure);
                UserProfile currentUser = result.Read<UserProfile>().FirstOrDefault();
                currentUser.CoinWatchList = result.Read<int>().ToList();
                currentUser.CoinOffer = result.Read<CoinOffer>().ToList();

                return currentUser;
            }
        }

        public List<int> AddCoinToWatchlist(WatchCoin watchCoin)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@CoinId", watchCoin.CoinId);
                param.Add("@UserId", watchCoin.UserId);
                
                List<int> watchCoins = _db.Query<int>("dbo.User_WatchList_Add", param, commandType: CommandType.StoredProcedure).ToList();

                return watchCoins;
            }
        }

        public List<int> RemoveCoinFromWatchlist(WatchCoin watchCoin)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@CoinId", watchCoin.CoinId);
                param.Add("@UserId", watchCoin.UserId);

                List<int> watchCoins = _db.Query<int>("dbo.User_WatchList_Remove", param, commandType: CommandType.StoredProcedure).ToList();

                return watchCoins;
            }
        }

        public int SendOffer(CoinOffer coinOffer)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@CoinId", coinOffer.CoinId);
                param.Add("@UserId", coinOffer.UserId);
                param.Add("@OfferPrice", coinOffer.OfferPrice);

                int newUserOfferId = _db.Query<int>("dbo.User_Coin_Offer_Add", param, commandType: CommandType.StoredProcedure).FirstOrDefault();

                //send offer email to seller
                if (newUserOfferId > 0)
                {
                    EmailService emailService = new EmailService();
                    if (emailService.SendUserMakeOffer())
                        ChangeCoinOfferStatus(coinOffer.CoinId, coinOffer.UserId, "ST");
                }

                return newUserOfferId;
            }
        }

        public void ChangeCoinOfferStatus(int coinId, int userId, string statusCode)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@CoinId", coinId);
                param.Add("@UserId", userId);
                param.Add("@OfferStatusCode", statusCode);

                int newUserOfferId = _db.Query<int>("dbo.User_Coin_Offer_Status_Changed", param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }


        public int forgetPassword(string userEmail, string webapiUrl)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //send reset password email to user
                string guidString = Guid.NewGuid().ToString();
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserEmail", userEmail);
                param.Add("@GUID", guidString);
                param.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _db.Execute("dbo.User_Reset_Password_Add", param, commandType: CommandType.StoredProcedure);
                int outputId = param.Get<int>("@Id");

                if (outputId > 0)
                {
                    EmailService emailService = new EmailService();
                    return emailService.SendUserResetPasswordEmail(userEmail, webapiUrl+ guidString);
                }

                return 0;
            }
        }

        public int changePassword(UserNewPassword userNewPassword)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //send reset password email to user
                string guidString = Guid.NewGuid().ToString();
                DynamicParameters param = new DynamicParameters();
                param.Add("@GUID", userNewPassword.GUID);
                param.Add("@NewPassword", BCrypt.Net.BCrypt.HashPassword(userNewPassword.Password));
                param.Add("@Id", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _db.Execute("dbo.User_Password_Change", param, commandType: CommandType.StoredProcedure);
                int outputId = param.Get<int>("@Id");

                return outputId;
            }
        }
    }
}
