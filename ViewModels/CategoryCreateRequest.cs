namespace MiniShop.ViewModels
{
    public class CategoryCreateRequest
    {
        public string Name { get; set; }
        public int? ParentId { set; get; }
    }
}