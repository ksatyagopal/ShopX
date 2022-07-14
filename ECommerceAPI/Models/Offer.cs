using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Offer
    {
        public Offer()
        {
            OrderItems = new HashSet<OrderItem>();
            Orders = new HashSet<Order>();
        }

        public int OfferId { get; set; }
        public string OfferName { get; set; }
        public string OfferDescription { get; set; }
        public int? ProductId { get; set; }
        public int? DiscountPercentage { get; set; }
        public double? DiscountAmount { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? DeletedOn { get; set; }

        public virtual Product Product { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
