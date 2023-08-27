namespace BYDWebApi.DTO.Payment
{
    public class PaymentRequest
    {
        public string PaymentMethodId { get; set; }
        public long Amount { get; set; }
        public int UserId { get; set; }
        public int[] CoinIds { get; set; }
        public long SubTotal { get; set; }
        public long ShippingFee { get; set; }
        public long Tax { get; set; }
    }
}
