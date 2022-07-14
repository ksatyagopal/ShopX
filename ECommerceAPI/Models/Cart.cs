using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Cart
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
        public double? SubTotal { get; set; }
        public bool? IsSelectedForOrder { get; set; }
        public int? OfferId { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
