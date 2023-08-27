namespace BYDWebApi.DTO.User
{
    public class CoinOrder
    {
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public int CoinId { get; set; }
        public string OrderStatusCode { get; set; }
        public decimal PurchasePrice { get; set; }
        public DateTime PurchaseDate { get; set; }
        public decimal Tax { get; set; }
        public decimal ShippingFee { get; set; }
        public decimal ServiceFee { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool NeedCheckOut { get; set; }
    }
}
