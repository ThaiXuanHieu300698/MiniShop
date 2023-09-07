using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniShop.Data;
using MiniShop.Models;
using MiniShop.Services;
using MiniShop.ViewModels;

namespace MiniShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IStorageService _storageService;
        public ProductsController(ApplicationDbContext context, IStorageService storageService)
        {
            _context = context;
            _storageService = storageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Select(x => new Product
            {
                Id = x.Id,
                Name = x.Name,
                OriginalPrice = x.OriginalPrice,
                Price = x.Price,
                Description = x.Description,
                BrandId = x.BrandId,
                ProductImages = _context.ProductImages.Where(pi => pi.ProductId == x.Id).ToList(),
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            product.ProductImages = await _context.ProductImages.Where(pi => pi.ProductId == id).ToListAsync();
            return product;
        }

        [HttpPost]
        public async Task<IActionResult> PostProduct([FromForm] ProductCreateRequest productCreateRequest)
        {
            var category = await _context.Categories.Where(c => productCreateRequest.CategoryIds.Contains(c.Id)).ToListAsync();
            var product = new Product
            {
                Name = productCreateRequest.Name,
                OriginalPrice = productCreateRequest.OriginalPrice,
                Price = productCreateRequest.Price,
                Description = productCreateRequest.Description,
                BrandId = productCreateRequest.BrandId
            };

            foreach (var item in category)
            {
                product.ProductCategories.Add(new ProductCategory
                {
                    Product = product,
                    Category = item
                });
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            if (productCreateRequest.ThumbnailImages != null)
            {
                foreach (var item in productCreateRequest.ThumbnailImages)
                {
                    _context.ProductImages.Add(new ProductImage
                    {
                        ImageUrl = await this.SaveFile(item),
                        Description = "Description",
                        ProductId = product.Id
                    });
                }

                await _context.SaveChangesAsync();
            }

            return Ok(product);
        }
        private async Task<string> SaveFile(IFormFile file)
        {
            var originalFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fileName = $"{file.FileName.Split('.')[0]}-{Guid.NewGuid()}{Path.GetExtension(originalFileName)}";
            await _storageService.SaveFileAsync(file.OpenReadStream(), fileName);
            return _storageService.GetFileUrl(fileName);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] ProductCreateRequest productCreateRequest)
        {
            var product = await _context.Products.FindAsync(id);
            product.Name = productCreateRequest.Name;
            product.OriginalPrice = productCreateRequest.OriginalPrice;
            product.Price = productCreateRequest.Price;
            product.Description = productCreateRequest.Description;
            product.BrandId = productCreateRequest.BrandId;

            var categoryOld = await _context.ProductCategories.Where(x => x.ProductId == id).ToListAsync();
            var categoryNew = await _context.Categories.Where(c => productCreateRequest.CategoryIds.Contains(c.Id)).ToListAsync();
            _context.ProductCategories.RemoveRange(categoryOld);
            foreach (var item in categoryNew)
            {
                product.ProductCategories.Add(new ProductCategory
                {
                    Product = product,
                    Category = item
                });
            }

            if (productCreateRequest.ThumbnailImages != null)
            {
                var productImageOld = await _context.ProductImages.Where(x => x.ProductId == id).ToListAsync();
                _context.ProductImages.RemoveRange(productImageOld);
                foreach (var item in productCreateRequest.ThumbnailImages)
                {
                    _context.ProductImages.Add(new ProductImage
                    {
                        ImageUrl = await this.SaveFile(item),
                        Description = "Description",
                        ProductId = product.Id
                    });
                }

                await _context.SaveChangesAsync();
            }

            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
    }
}