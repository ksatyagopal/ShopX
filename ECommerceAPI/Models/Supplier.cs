using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Supplier
    {
        public Supplier()
        {
            Storages = new HashSet<Storage>();
        }

        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Slocation { get; set; }

        public virtual ICollection<Storage> Storages { get; set; }
    }
}
