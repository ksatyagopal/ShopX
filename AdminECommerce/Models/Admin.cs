using System;
using System.Collections.Generic;

#nullable disable

namespace AdminECommerceAPI.Models
{
    public partial class Admin
    {
        public Admin()
        {
            ChatMessageFromNavigations = new HashSet<Chat>();
            ChatMessageToNavigations = new HashSet<Chat>();
            Contributions = new HashSet<Contribution>();
        }

        public int AdminId { get; set; }
        public string AdminName { get; set; }
        public string Email { get; set; }
        public long? Mobile { get; set; }
        public bool? IsSuperAdmin { get; set; }
        public string LastLoggedIn { get; set; }
        public string Password { get; set; }
        public bool? IsLoggedIn { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsLocked { get; set; }
        public int? UnSuccessfulAttempts { get; set; }

        public virtual ICollection<Chat> ChatMessageFromNavigations { get; set; }
        public virtual ICollection<Chat> ChatMessageToNavigations { get; set; }
        public virtual ICollection<Contribution> Contributions { get; set; }
    }
}
