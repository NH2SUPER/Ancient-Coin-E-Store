using BYDWebApi.DTO.User;

namespace BYDWebApi.DTO.BYDCoin
{
    public class Coin
    {
        public int CoinId { get; set; }
        public string CoinNumber { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string CountryCode { get; set; }
        public string Country { get; set; }
        public int TypeId { get; set; }
        public int CategoryId { get; set; }
        public int CompositionId { get; set; }
        public decimal CompositionPercent { get; set; }
        public string FaceValue { get; set; }
        public int Year { get; set; }
        public string CertificationId { get; set; }
        public decimal Weight { get; set; }
        public decimal Diameter { get; set; }
        public string Condition { get; set; }
        public DateTime MintDate { get; set; }


        public decimal StartPrice { get; set; }
        public decimal CurrentPrice { get; set; }
        public string Interval { get; set; }
        public string IntervalString { get; set; }
        public decimal Increment { get; set; }
        public decimal LowestPrice { get; set; }
        public DateTime NextUpdateDateTime { get; set; }
        public string LeftTime { get; set; }
        public string[] OriginalImageUrls { get; set; }
        public string[] ImageUrls { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }


        public string CarrierNameDomestic { get; set; }
        public string ServiceTypeDomestic { get; set; }
        public decimal ShippingFeeDomestic { get; set; }
        public string CarrierNameInternational { get; set; }
        public string ServiceTypeInternational { get; set; }
        public decimal ShippingFeeInternational { get; set; }
  

        public bool CoinInWatchList { get; set; }
        public CoinOffer CoinOffer { get; set; }
        public CoinOrder CoinOrder { get; set; }

        public int UserId { get; set; }
        public DateTime EnteredDate { get; set; }

    }
}
