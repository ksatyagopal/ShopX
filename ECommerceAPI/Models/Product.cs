using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Product
    {
        public Product()
        {
            Carts = new HashSet<Cart>();
            Offers = new HashSet<Offer>();
            OrderItems = new HashSet<OrderItem>();
            Storages = new HashSet<Storage>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public double? Price { get; set; }
        public string Active { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string Pdescription { get; set; }
        public string Category { get; set; }

        public virtual ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Offer> Offers { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<Storage> Storages { get; set; }
    }
}
