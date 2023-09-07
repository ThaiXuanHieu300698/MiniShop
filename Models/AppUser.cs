using System;
using Microsoft.AspNetCore.Identity;

namespace MiniShop.Models
{
    public class AppUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}