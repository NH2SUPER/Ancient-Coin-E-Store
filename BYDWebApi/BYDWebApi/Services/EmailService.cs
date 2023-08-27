using BYDWebApi.DTO.User;
using BYDWebApi.DTO.BYDCoin;
using System;
using System.Net;
using System.Net.Mail;
using BYDWebApi.DTO.Payment;

namespace BYDWebApi.Services
{
    public class EmailService
    {
        private SmtpClient smtpClient;
        public EmailService() {
            string senderEmail = "caiter999@hotmail.com";
            string senderPassword = "Yanyan7258@";

            smtpClient = new SmtpClient("smtp-mail.outlook.com", 587);
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential(senderEmail, senderPassword);
        }

        public bool SendUserMakeOffer()
        {
            try
            {        
                // Create a new MailMessage
                MailMessage mailMessage = new MailMessage();

                // Set the sender and recipient addresses
                mailMessage.From = new MailAddress("caiter999@hotmail.com");
                mailMessage.To.Add("caiter999@hotmail.com");

                // Set the email subject and body
                mailMessage.Subject = "Test Email";
                mailMessage.Body = "This is a test email.";

                // Send the email
                smtpClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public int SendUserResetPasswordEmail(string userEmail, string webapiUrl)
        {
            try
            {
                // Create a new MailMessage
                MailMessage mailMessage = new MailMessage();

                // Set the sender and recipient addresses
                mailMessage.From = new MailAddress("caiter999@hotmail.com");
                mailMessage.To.Add(userEmail);

                // Set the email subject and body
                mailMessage.Subject = "Reset password";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "Hi,\n";
                mailMessage.Body += "  Please click link below to reset your password:\n";

                mailMessage.Body += "<html><body>";
                mailMessage.Body += "<p><a href='"+webapiUrl+"'>Click here</a></p>";
                mailMessage.Body += "</body></html>";

                mailMessage.Body += "\n\n\nThanks,\n";
                mailMessage.Body += "BYDD Inc.\n";

                // Send the email
                smtpClient.Send(mailMessage);

                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public bool SendUserOfferAccepted(string coinName, string userEmail)
        {
            try
            {
                // Create a new MailMessage
                MailMessage mailMessage = new MailMessage();

                // Set the sender and recipient addresses
                mailMessage.From = new MailAddress("caiter999@hotmail.com");
                mailMessage.To.Add(userEmail);

                // Set the email subject and body
                mailMessage.Subject = "Your coin offer was accepted.";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "Hi,\n";
                mailMessage.Body += "  Cong. Your coin("+ coinName + ") offer was accepted by seller.\n";

                mailMessage.Body += "Please go to [My Order] page to checkout.";

                mailMessage.Body += "\n\n\nThanks,\n";
                mailMessage.Body += "BYDD Inc.\n";

                // Send the email
                smtpClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendUserInvoice(int invoiceId, User customer, List<CoinShipping> coins)
        {
            try
            {
                // Create a new MailMessage
                MailMessage mailMessage = new MailMessage();

                // Set the sender and recipient addresses
                mailMessage.From = new MailAddress("caiter999@hotmail.com");
                mailMessage.To.Add(customer.Email);

                // Set the email subject and body
                mailMessage.Subject = "Invoice - "+ invoiceId;
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "Hi " + customer.FirstName + " " + customer.LastName + ",\n";
                mailMessage.Body += "  We received your payment for invoice - "+ invoiceId + ". Thank you very much.\n";
                mailMessage.Body += "  We will prepare shipment and send tracking number to you soon.";

                mailMessage.Body += "\n\n\nThanks,\n";
                mailMessage.Body += "BYDD Inc.\n";

                // Send the email
                smtpClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendUserPaidInfoToCompany(User customer, List<CoinShipping> coins)
        {
            try
            {
                // Create a new MailMessage
                MailMessage mailMessage = new MailMessage();

                // Set the sender and recipient addresses
                mailMessage.From = new MailAddress("caiter999@hotmail.com");
                mailMessage.To.Add(customer.Email);

                // Set the email subject and body
                mailMessage.Subject = "Coin was sold";
                mailMessage.IsBodyHtml = true;
                mailMessage.Body = "Hi " + coins[0].CompanyName + ",\n";
                mailMessage.Body += "  The customer had paid your coins, like below:\n";

                foreach(CoinShipping cs in coins)
                {
                    mailMessage.Body += "   Coin Id: " + cs.CoinId + " - " + cs.Name + "\n";
                }

                mailMessage.Body += "  Please prepare shipment and update tracking number.";

                mailMessage.Body += "\n\n\nThanks,\n";
                mailMessage.Body += "BYDD Inc.\n";

                // Send the email
                smtpClient.Send(mailMessage);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
