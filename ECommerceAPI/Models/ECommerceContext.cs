using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ECommerceAPI.Models
{
    public partial class ECommerceContext : DbContext
    {
        public ECommerceContext()
        {
        }

        public ECommerceContext(DbContextOptions<ECommerceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Advertisement> Advertisements { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Offer> Offers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderItem> OrderItems { get; set; }
        public virtual DbSet<PaymentDetail> PaymentDetails { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<Storage> Storages { get; set; }
        public virtual DbSet<Supplier> Suppliers { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserAddress> UserAddresses { get; set; }
        public virtual DbSet<UserPayment> UserPayments { get; set; }
        public virtual DbSet<WishList> WishLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=ECommerce;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Advertisement>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.AdsId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AdsID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Advertise__Produ__440B1D61");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cart__ProductID__33D4B598");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Cart__UserID__32E0915F");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Body)
                    .HasMaxLength(1000)
                    .IsUnicode(false);

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Title)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Notificat__UserI__48CFD27E");
            });

            modelBuilder.Entity<Offer>(entity =>
            {
                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DeletedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.OfferName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Offers)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Offers__ProductI__2B3F6F97");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.DeliveryDate).HasColumnType("date");

                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.Property(e => e.OrderStatus)
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.OrderedOn).HasColumnType("datetime");

                entity.Property(e => e.PaymentId).HasColumnName("PaymentID");

                entity.Property(e => e.PaymentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.DeliveryAddressNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.DeliveryAddress)
                    .HasConstraintName("FK__Orders__Delivery__38996AB5");

                entity.HasOne(d => d.Offer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.OfferId)
                    .HasConstraintName("FK__Orders__OfferID__37A5467C");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Orders__UserID__36B12243");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.Property(e => e.OfferId).HasColumnName("OfferID");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.ReturnedOn).HasColumnType("datetime");

                entity.HasOne(d => d.Offer)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OfferId)
                    .HasConstraintName("FK__OrderItem__Offer__3D5E1FD2");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderItem__Order__3B75D760");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__OrderItem__Produ__3C69FB99");
            });

            modelBuilder.Entity<PaymentDetail>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PK__PaymentD__9B556A58841A9CBF");

                entity.Property(e => e.PaymentId).HasColumnName("PaymentID");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Provider)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reason).HasMaxLength(50);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Active)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("active");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Pdescription).HasColumnName("PDescription");

                entity.Property(e => e.ProductName).IsRequired();
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Qid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("QID");

                entity.Property(e => e.Question1).HasColumnName("Question");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Questions__Produ__4BAC3F29");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Questions__UserI__4AB81AF0");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.Rating1).HasColumnName("Rating");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ratings__Product__3F466844");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Ratings__UserID__403A8C7D");
            });

            modelBuilder.Entity<Storage>(entity =>
            {
                entity.ToTable("Storage");

                entity.Property(e => e.StorageId).HasColumnName("StorageID");

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.StorageName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SupplierId).HasColumnName("SupplierID");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Storages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Storage__Product__286302EC");

                entity.HasOne(d => d.Supplier)
                    .WithMany(p => p.Storages)
                    .HasForeignKey(d => d.SupplierId)
                    .HasConstraintName("FK__Storage__Supplie__276EDEB3");
            });

            modelBuilder.Entity<Supplier>(entity =>
            {
                entity.Property(e => e.SupplierId).HasColumnName("SupplierID");

                entity.Property(e => e.Slocation).HasColumnName("SLocation");

                entity.Property(e => e.SupplierName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DeletedOn).HasColumnType("datetime");

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastLoggedIn).HasColumnType("datetime");

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.MailId)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("MailID");

                entity.Property(e => e.Mobile).HasMaxLength(10);

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .HasMaxLength(16)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserAddress>(entity =>
            {
                entity.Property(e => e.AddressLine1).HasMaxLength(50);

                entity.Property(e => e.AddressLine2).HasMaxLength(50);

                entity.Property(e => e.City).HasMaxLength(50);

                entity.Property(e => e.ContactPerson)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Country).HasMaxLength(50);

                entity.Property(e => e.MailId)
                    .HasMaxLength(50)
                    .HasColumnName("MailID");

                entity.Property(e => e.Mobile).HasMaxLength(50);

                entity.Property(e => e.PostalCode).HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserAddresses)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserAddre__UserI__300424B4");
            });

            modelBuilder.Entity<UserPayment>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Expiry).HasColumnType("datetime");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.PaymentType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Reference)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__UserPayme__UserI__4222D4EF");
            });

            modelBuilder.Entity<WishList>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("WishList");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.ProductId).HasColumnName("ProductID");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WishList__Produc__45F365D3");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__WishList__UserID__46E78A0C");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
