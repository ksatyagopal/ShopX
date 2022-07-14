using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class UserPayment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ProviderType { get; set; }
        public string PaymentType { get; set; }
        public string Reference { get; set; }
        public DateTime? Expiry { get; set; }

        public virtual User User { get; set; }
    }
}
