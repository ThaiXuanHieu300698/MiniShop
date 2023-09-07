using System.Collections.Generic;

namespace MiniShop.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { set; get; }
        public IList<ProductCategory> ProductCategories { get; private set; } = new List<ProductCategory>();
    }
}