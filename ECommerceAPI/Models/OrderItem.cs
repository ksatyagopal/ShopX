using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class OrderItem
    {
        public int Id { get; set; }
        public long? OrderId { get; set; }
        public string ProductName { get; set; }
        public int? ProductId { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
        public double? SubTotal { get; set; }
        public int? OfferId { get; set; }
        public bool? IsReturned { get; set; }
        public DateTime? ReturnedOn { get; set; }

        public virtual Offer Offer { get; set; }
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
