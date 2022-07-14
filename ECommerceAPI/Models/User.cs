using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class User
    {
        public User()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            UserAddresses = new HashSet<UserAddress>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MailId { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public DateTime? CreatedOn { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsLoggedIn { get; set; }
        public DateTime? LastLoggedIn { get; set; }
        public bool? WantAlerts { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<UserAddress> UserAddresses { get; set; }
    }
}
