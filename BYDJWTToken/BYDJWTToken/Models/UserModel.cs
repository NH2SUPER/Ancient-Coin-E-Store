namespace BYDJWTToken.Models
{
    public class UserModel:UserBase
    {
        public int UserId { get; set; }
        public string Role { get; set; }
    }
}
