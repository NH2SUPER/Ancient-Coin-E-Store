using BYDWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace BYDWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private const string StripeApiKey = "sk_test_51NJqgDLgI6S7ZMtJvYdO3MmzRftDGS5aLBGlNMiQfS32rwhSfgIbwNHqbzH18jxtZaM6hosRdlJcwq7CuDgSHvnf00QRD7GtLk";

        [HttpPost]
        public IActionResult ProcessPayment(DTO.Payment.PaymentRequest paymentRequest)
        {
            StripeConfiguration.ApiKey = StripeApiKey;

            var options = new PaymentIntentCreateOptions
            {
                Amount = paymentRequest.Amount*100,
                Currency = "usd",
                PaymentMethod = paymentRequest.PaymentMethodId,
                ConfirmationMethod = "manual",
                Confirm = true
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            //process backend logic: remove order, create invoice etc
            if (paymentIntent.Status== "succeeded")
            {
                CoinService coinService = new CoinService();
                coinService.UserPaymentSucceed(paymentRequest);
            }

            // Handle the payment intent response and return the result
            return Ok(paymentIntent);
        }
    }
}
