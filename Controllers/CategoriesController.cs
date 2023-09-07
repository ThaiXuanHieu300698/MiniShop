using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniShop.Data;
using MiniShop.Models;
using MiniShop.ViewModels;

namespace MiniShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();
            return category;
        }

        [HttpPost]
        public async Task<IActionResult> PostCategory(CategoryCreateRequest categoryCreateRequest)
        {
            var category = new Category
            {
                Name = categoryCreateRequest.Name
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, CategoryCreateRequest categoryCreateRequest)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();
            category.Name = categoryCreateRequest.Name;
            category.ParentId = categoryCreateRequest.ParentId;
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = id }, category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
                return NotFound();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent();

        }
    }
}