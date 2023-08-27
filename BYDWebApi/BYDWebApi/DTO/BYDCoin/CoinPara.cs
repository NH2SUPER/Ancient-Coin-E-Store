namespace BYDWebApi.DTO.BYDCoin
{
    public class CoinPara
    {
        public int UserId { get; set; }
        public int CoinId { get; set; }
        public int Skip { get; set; }
        public int PageSize { get; set; }
        public string ParaString { get; set; }
        public string Filter { get; set; }
        public string Sort { get; set; }
    }
}
