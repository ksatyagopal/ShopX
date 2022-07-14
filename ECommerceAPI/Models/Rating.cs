using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Rating
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int? Rating1 { get; set; }
        public int UserId { get; set; }
        public string Review { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
