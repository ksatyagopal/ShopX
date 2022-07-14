using System;
using System.Collections.Generic;

#nullable disable

namespace AdminECommerceAPI.Models
{
    public partial class Chat
    {
        public int ChatId { get; set; }
        public int? MessageFrom { get; set; }
        public int? MessageTo { get; set; }
        public string Message { get; set; }
        public DateTime? SentTime { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsViewed { get; set; }
        public bool? IsCalled { get; set; }

        public virtual Admin MessageFromNavigation { get; set; }
        public virtual Admin MessageToNavigation { get; set; }
    }
}
