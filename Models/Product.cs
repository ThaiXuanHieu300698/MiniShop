using System.Collections.Generic;

namespace MiniShop.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public Brand Brand { get; set; }
        public List<ProductImage> ProductImages { get; set; }
        public IList<ProductCategory> ProductCategories { get; set; } = new List<ProductCategory>();
    }
}