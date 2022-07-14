using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Models;

namespace ECommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAddressesController : ControllerBase
    {
        private readonly ECommerceContext _context;

        public UserAddressesController(ECommerceContext context)
        {
            _context = context;
        }

        // GET: api/UserAddresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserAddress>>> GetUserAddresses()
        {
            return await _context.UserAddresses.ToListAsync();
        }

        // GET: api/UserAddresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAddress>> GetUserAddress(int id)
        {
            var userAddress = await _context.UserAddresses.FindAsync(id);

            if (userAddress == null)
            {
                return NotFound();
            }

            return userAddress;
        }

        // PUT: api/UserAddresses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAddress(int id, UserAddress userAddress)
        {
            if (id != userAddress.Id)
            {
                return BadRequest();
            }

            _context.Entry(userAddress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAddressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserAddresses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAddress>> PostUserAddress(UserAddress userAddress)
        {
            _context.UserAddresses.Add(userAddress);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUserAddress", new { id = userAddress.Id }, userAddress);
        }

        // DELETE: api/UserAddresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAddress(int id)
        {
            var userAddress = await _context.UserAddresses.FindAsync(id);
            if (userAddress == null)
            {
                return NotFound();
            }

            _context.UserAddresses.Remove(userAddress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserAddressExists(int id)
        {
            return _context.UserAddresses.Any(e => e.Id == id);
        }
    }
}
