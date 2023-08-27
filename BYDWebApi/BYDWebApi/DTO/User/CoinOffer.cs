namespace BYDWebApi.DTO.User
{
    public class CoinOffer
    {
        public int UserId { get; set; }
        public int CoinId { get; set; }
        public string CoinName { get; set; }
        public decimal OfferPrice { get; set; }
        public DateTime OfferDate { get; set; }
        public string OfferStatusCode { get; set; }
    }
}
