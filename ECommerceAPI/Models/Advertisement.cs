using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Advertisement
    {
        public int AdsId { get; set; }
        public string AdName { get; set; }
        public string AdDescription { get; set; }
        public string AdImageUrl { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
    }
}
