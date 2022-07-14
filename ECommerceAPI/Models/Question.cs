using System;
using System.Collections.Generic;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class Question
    {
        public int Qid { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Question1 { get; set; }
        public string Answer { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
