namespace BYDWebApi.DTO.User
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsActive { get; set; }
        public DateTime? EnteredDate { get; set; }
        public int EnteredUserId { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int UpdatedUserId { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public string Mobile { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
}
