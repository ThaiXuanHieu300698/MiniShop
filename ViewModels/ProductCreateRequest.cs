using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace MiniShop.ViewModels
{
    public class ProductCreateRequest
    {
        public string Name { get; set; }
        public decimal OriginalPrice { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public IList<IFormFile> ThumbnailImages { get; set; }
        public IList<int> CategoryIds { get; set; }
    }
}