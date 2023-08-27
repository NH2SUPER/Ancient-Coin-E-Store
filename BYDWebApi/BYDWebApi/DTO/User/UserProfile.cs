namespace BYDWebApi.DTO.User
{
    public class UserProfile:User
    {
        public List<int> CoinWatchList { get; set; }

        public List<CoinOffer> CoinOffer { get; set; }
    }
}
