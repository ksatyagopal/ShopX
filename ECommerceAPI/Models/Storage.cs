using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Storage
    {
        public int StorageId { get; set; }
        public string StorageName { get; set; }
        public int? SupplierId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }

        public virtual Product Product { get; set; }
        public virtual Supplier Supplier { get; set; }
    }
}
