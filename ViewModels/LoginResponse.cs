using MiniShop.Models;

namespace MiniShop.ViewModels
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public AppUser user { get; set; }
    }
}