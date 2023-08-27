namespace BYDJWTToken.Models
{
    public class UserConstants
    {
        public static List<UserModel> Users = new()
            {
                new UserModel(){ Username="string",Password="string",Role="User"}
            };
    }
}
