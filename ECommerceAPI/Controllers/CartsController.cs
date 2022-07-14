using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Models;
using Newtonsoft.Json;

namespace ECommerceAPI.Controllers
{
    public class JsonObj
    {
        public string result { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]

    public class CartsController : ControllerBase
    {
        private readonly ECommerceContext _context;
        public CartsController(ECommerceContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> Get(int userId)
        {
            List<Cart> carts = _context.Carts.Where(x => x.UserId == userId).ToList();
            return carts;
        }
        [HttpGet("getcount")]
        public async Task<ActionResult<int>> getcountItemsofCart(int userId)
        {
            List<Cart> carts = _context.Carts.Where(x => x.UserId == userId).ToList();
            int? totalCartproducts = 0;
            foreach (var item in carts)
            {
                totalCartproducts += Convert.ToInt32(item.Quantity);
            }
            return totalCartproducts;
        }
        [HttpPost]
        public async Task<ActionResult> insert(int Prdid, int userId)
        {
            if (Prdid == 0)
            {
                return NotFound();
            }
            try
            {
                var product = _context.Products.Find(Prdid);
                if (product == null)
                {
                    return NotFound();
                }
                Cart c = new Cart();
                c.UserId = userId;
                c.Price = product.Price;
                c.ProductId = product.ProductId;
                c.ProductName = product.ProductName;
                var update =
             _context.Carts.Where(x => x.ProductId == product.ProductId && x.UserId == userId)
              .FirstOrDefault();
                if (update == null)
                {
                    c.Quantity = 1;
                    c.SubTotal = c.Price * c.Quantity;
                    _context.Carts.Add(c);
                    _context.SaveChanges();
                    JsonObj jsobj = new JsonObj();
                    jsobj.result = c.ProductName + " added";
                    string output = JsonConvert.SerializeObject(jsobj);
                    JsonObj deserializedProduct = JsonConvert.DeserializeObject<JsonObj>(output);
                    return Ok(deserializedProduct);
                }
                else
                {
                    c.Quantity = update.Quantity + 1;
                    c.SubTotal = c.Price * c.Quantity;
                    var updatequery = _context.Carts.Where(x => x.ProductId == product.ProductId && x.UserId == userId)
                  .FirstOrDefault();
                    updatequery.Quantity = c.Quantity;
                    updatequery.SubTotal = c.SubTotal;
                    _context.SaveChanges();
                    JsonObj jsobj = new JsonObj();
                    jsobj.result = c.ProductName + " already exist so Quantity increased";
                    string output = JsonConvert.SerializeObject(jsobj);
                    JsonObj deserializedProduct = JsonConvert.DeserializeObject<JsonObj>(output);
                    return Ok(deserializedProduct);
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        //Removing 
        [Route("Remove")]
        [HttpPut]
        public async Task<ActionResult<string>> Remove(int Prdid, int userId)
        {
            var cart = _context.Carts.Where(x => x.ProductId == Prdid && x.UserId == userId).FirstOrDefault();

            var update =
         _context.Carts.Where(x => x.ProductId == Prdid && x.UserId == userId)
          .FirstOrDefault();
            try
            {

                if (update != null && update.Quantity == 1)
                {
                    _context.Carts.Remove(cart);
                    _context.SaveChanges();
                    JsonObj jsobj = new JsonObj();
                    jsobj.result = "Success";
                    string output = JsonConvert.SerializeObject(jsobj);
                    JsonObj deserializedProduct = JsonConvert.DeserializeObject<JsonObj>(output);
                    return Ok(deserializedProduct);
                }
                else
                {
                    if (update == null)
                    {
                        return BadRequest();
                    }
                    else
                    {
                        cart.Quantity = update.Quantity - 1;
                        cart.SubTotal = cart.Quantity * cart.Price;
                        var updatequery = _context.Carts.Where(x => x.ProductId == cart.ProductId && x.UserId == userId)
                      .FirstOrDefault();
                        updatequery.Quantity = cart.Quantity;
                        updatequery.SubTotal = cart.SubTotal;
                        _context.SaveChanges();
                        JsonObj jsobj = new JsonObj();
                        jsobj.result = "Success";
                        string output = JsonConvert.SerializeObject(jsobj);
                        JsonObj deserializedProduct = JsonConvert.DeserializeObject<JsonObj>(output);
                        return Ok(deserializedProduct);
                    }
                }
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
