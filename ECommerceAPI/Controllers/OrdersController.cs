using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Models;
using ECommerceAPI.Exceptions;

namespace ECommerceAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public OrdersController(ECommerceContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder(long id)
        {
            var order = _context.Orders.Where(e => e.UserId == id).ToList();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(long id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPost]
        public async Task<IActionResult> placeOrder([Bind("Id,UserId,AddressLine1,AddressLine2,City,PostalCode,Country,Mobile,MailId,ContactPerson")] UserAddress address)
        {
            int userId = address.UserId;
            try
            {
                _context.Add(address);
                await _context.SaveChangesAsync();

                var cart = await _context.Carts.Where(o => o.UserId == userId).ToListAsync();
                float total = (float)(from c in cart where c.UserId == userId select c).Sum(x => x.SubTotal).Value;
                if (cart != null)
                {

                    Order order = new Order();
                    order.UserId = address.UserId;
                    order.TotalAmount = Math.Round(total, 2);
                    order.PaymentType = "COD";
                    order.OrderStatus = "placed";
                    order.OrderedOn = DateTime.Now;
                    order.DeliveryDate = DateTime.Now.AddDays(7);

                    _context.Add(order);
                    await _context.SaveChangesAsync();

                    var orderI = _context.Orders.Where(o => o.UserId == userId).ToList();

                    var orderInfo = orderI.LastOrDefault();
                    if (orderInfo.OrderId == null || orderInfo.OrderId <= 0)
                    {
                        throw new OrderIdNotFound("Order Id Not Generated");
                    }
                    foreach (var c in cart)
                    {

                        OrderItem oi = new OrderItem();
                        oi.OrderId = orderInfo.OrderId;
                        oi.ProductId = c.ProductId;
                        oi.ProductName = c.ProductName;
                        oi.Price = c.Price;

                        oi.Product = _context.Products.Where(p => p.ProductId == c.ProductId).FirstOrDefault();
                        oi.SubTotal = c.SubTotal;
                        oi.Quantity = c.Quantity;
                        _context.Add(oi);
                        await _context.SaveChangesAsync();

                    }
                    //address.UserId = 1000;

                    var add = _context.UserAddresses.Where(o => o.UserId == userId).ToList();
                    var oneAdd = add.LastOrDefault();
                    orderInfo.DeliveryAddress = oneAdd.Id;
                    _context.SaveChanges();

                    if (cart != null)
                    {
                        _context.Carts.RemoveRange(cart);
                        _context.SaveChanges();
                        //  return Ok(orderInfo.OrderId);

                    }



                    return Ok(orderInfo.OrderId.ToString());
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [Route("GetUserAdd")]
        [HttpGet]
        public async Task<ActionResult> GetUserAdd(int uid)
        {
            try
            {
                var userAdd = _context.UserAddresses.Where(o => o.Id == uid).ToList();
                var addInfo = userAdd.LastOrDefault();
                if (addInfo == null)
                {
                    throw new UserAddressNotFound("AddressNot Found for This User:" + uid);

                }

                return Ok(addInfo);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [Route("GetOrderItems")]
        [HttpGet]
        public async Task<ActionResult> GetOrderItems(int oid)
        {
            try
            {
                var orderI = _context.OrderItems.Where(o => o.OrderId == oid).ToList();

                return Ok(orderI);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }


        [Route("GetById")]
        [HttpGet]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var orderI = _context.Orders.Where(o => o.UserId == id).ToList();
                var orderInfo = orderI.LastOrDefault();

                return Ok(orderInfo);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [Route("GetOrders")]
        [HttpGet]
        public async Task<ActionResult> GetOrder()
        {
            try
            {
                var orders = _context.Orders.ToList();
                return Ok(orders);
            }
            catch (Exception e)

            {
                return BadRequest();
            }

        }
        [Route("OrderItems")]
        [HttpGet]
        public List<OrderItem> getOrderItems()
        {
            return _context.OrderItems.ToList();

        }
    }
}
