namespace BYDWebApi.DTO.BYDCoin
{
    public class CoinNews
    {
        public int NewsId { get; set; }
        public string NewsName { get; set; }
        public string ImageUrl { get; set; }
        public string NewsDescription { get; set; }
        public string NewsStartDate { get; set; }
        public string Expired { get; set; }
        public int EnteredBy { get; set; }
        public DateTime EnteredDate { get; set; }
    }
}
