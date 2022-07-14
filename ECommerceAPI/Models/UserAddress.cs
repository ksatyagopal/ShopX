using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class UserAddress
    {
        public UserAddress()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Mobile { get; set; }
        public string MailId { get; set; }
        public string ContactPerson { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
