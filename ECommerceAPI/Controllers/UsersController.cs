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
    public class UsersController : ControllerBase
    {
        private readonly ECommerceContext _context;

        private readonly User user = new();
        private readonly Codes codes = new();
        public int otp = 0;

        public UsersController(ECommerceContext context)
        {
            _context = context;
        }
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            user.Password = codes.Hash(user.Password);
            user.CreatedOn = DateTime.Now;
            user.IsLoggedIn = false;
            user.IsActive = true;
            user.IsDeleted = false;
            user.WantAlerts = false;
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            var subject = $"ShopX - Account Creation Successfull";
            var mailbody = $"Hi {user.FirstName + " " + user.LastName},\n\n" +
                $"Welcome to ShopX.\n\n" +
                $"You have successfully created an account in ShopX.\n"+
                $"Note: If you haven't raised this request please contact superiors as soon as possible.\n" +
                $"\nBest Regards,\n ShopX Team";
            try
            {
                codes.SendEmail(subject, mailbody, user.MailId);
            }
            catch (Exception)
            {

            }

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("Logout/{id}")]
        public async Task<string> LogoutUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return "nouser";
            }

            user.IsLoggedIn = false;
            await _context.SaveChangesAsync();

            return "success";
        }

        [HttpGet("changeP/{mailid}/{password}")]
        public async Task<IActionResult> ChangePassword(string mailid, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(e => e.MailId == mailid);
            if (user == null)
            {
                return NotFound();
            }
            user.Password = codes.Hash(password);
            await _context.SaveChangesAsync();
            var subject = $"ShopX - Password Change Successfull";
            var mailbody = $"Hi {user.FirstName + " " + user.LastName},\n\n" +
                $"Your password changed successfully.\n\n" +
                $"Note: If you haven't raised this request please contact superiors as soon as possible.\n" +
                $"\nBest Regards,\n ShopX Team";
            try
            {
                codes.SendEmail(subject, mailbody, user.MailId);
            }
            catch (Exception)
            {
                
            }
            return Ok();
        }

        [HttpGet("{mailid}/{password}")]
        public async Task<string> UserByCrendentials(string mailid, string password)
        {
            User user = await _context.Users.FirstOrDefaultAsync(e => e.MailId == mailid);
            if (user == null)
            {
                return "nouser";
            }
            if (user.IsDeleted == true)
            {
                return "deleted";
            }
            if (user.IsLoggedIn == true)
            {
                return "loggedin";
            }
            if (user != null && codes.Verify(password, user.Password))
            {
                if (user.IsLoggedIn == true)
                {
                    return "loggedin";
                }
                user.LastLoggedIn = DateTime.Now;
                user.IsLoggedIn = true;
                _context.SaveChanges();
                return user.UserId.ToString();
            }

            return "invalid";
        }

        [HttpGet("ForgotPassword/{mailid}")]
        public async Task<string> ForgotPassword(string mailid)
        {
            Random random = new();
            var user = await _context.Users.FirstOrDefaultAsync(a => a.MailId == mailid);
            if (user == null)
            {
                return "nouser";
            }
            otp = random.Next(100000, 999999);
            var subject = $"ShopX - {otp} is your verification code for secure access";
            var mailbody = $"Hi {user.FirstName + " " + user.LastName},\n\n" +
                $"We are sharing a verification code to access your account." +
                $"\nOnce verified you are redirected to reset your password." +
                $"\n\nYour OTP: {otp}\n\n" +
                $"Note: If you haven't raised this request please contact superiors as soon as possible.\n" +
                $"\nBest Regards,\n ShopX Team";
            codes.SendEmail(subject, mailbody, user.MailId);
            return otp.ToString();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
