using System.Data;
using Dapper;
using System.Data.SqlClient;
using BCrypt.Net;
using BYDJWTToken.Models;

namespace BYDJWTToken.Services
{
    public class UserService
    {
        public string _ConnectString;
        public UserService()
        {
            _ConnectString = "Server=WINSVR2022-BYD; Initial Catalog=BYD;User ID=intranetuser;Password=devel0per;Connect Timeout=90";
        }

        public int CheckUser(UserBase user)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserEmail", user.Username);
                var result = _db.QueryMultiple("dbo.User_Profile_Get", param, commandType: CommandType.StoredProcedure);
                UserModel existedUser = result.Read<UserModel>().FirstOrDefault();

                if (existedUser != null)
                {
                    if (VerifyPassword(user.Password, existedUser.Password))
                        return existedUser.UserId;
                    else
                        return -1;
                } else
                    return -1;
            }
        }

        public bool VerifyPassword(string passwordToCheck, string storedHashedPassword)
        {
            // Verify the provided password against the stored hashed password
            return BCrypt.Net.BCrypt.Verify(passwordToCheck, storedHashedPassword);
        }

        public void SaveUserToken(string username, string token)
        {
            using (IDbConnection _db = new SqlConnection(_ConnectString))
            {
                //get open contract list data
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserName", username);
                param.Add("@Token", token);
                _db.Query<UserModel>("dbo.User_Token_Add", param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }
    }
}
