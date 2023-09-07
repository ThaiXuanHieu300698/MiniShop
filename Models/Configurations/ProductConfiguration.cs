using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MiniShop.Models.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Products");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Name)
                .HasMaxLength(150)
                .IsRequired();
            builder.Property(x => x.OriginalPrice).IsRequired();
            builder.Property(t => t.OriginalPrice)
                .HasColumnType("decimal(18,2)");
            builder.Property(x => x.Price).IsRequired();
            builder.Property(t => t.Price)
            .HasColumnType("decimal(18,2)");
        }
    }
}