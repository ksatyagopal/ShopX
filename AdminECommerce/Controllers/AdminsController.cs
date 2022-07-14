using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminECommerceAPI;
using AdminECommerceAPI.Models;

namespace AdminECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly ECommerceAdminDBContext _context;
        private readonly Codes codes = new();
        public int otp = 0;

        public AdminsController(ECommerceAdminDBContext context)
        {
            _context = context;
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

        // PUT: api/Admins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdmin(int id, Admin admin)
        {
            if (id != admin.AdminId)
            {
                return BadRequest();
            }

            _context.Entry(admin).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminExists(id))
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

        // POST: api/Admins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
            admin.Password = codes.Hash(admin.Password);
            _context.Admins.Add(admin);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdmin", new { id = admin.AdminId }, admin);
        }

        // DELETE: api/Admins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            admin.IsDeleted = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpHead("{id}")]
        public async Task<IActionResult> LogoutAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }

            admin.IsLoggedIn = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("changeP/{id}/{password}")]
        public async Task<string> ChangePassword(string id, string password)
        {
            var admin = await _context.Admins.FirstOrDefaultAsync(a=>a.Email == id);
            if (admin == null)
            {
                return "noadmin";
            }
            admin.Password = codes.Hash(password);
            admin.IsLocked = false;
            admin.UnSuccessfulAttempts = 0;
            await _context.SaveChangesAsync();

            return "success";
        }

        [HttpGet("{mailid}/{password}")]
        public async Task<string> AdminByCrendentials(string mailid, string password)
        {
            Admin admin = await _context.Admins.FirstOrDefaultAsync(e => e.Email == mailid);
            if(admin == null)
            {
                return "noadmin";
            }
            if (admin.IsLoggedIn == true)
            {
                return "loggedin";
            }
            if (admin.IsDeleted == true)
            {
                return "deleted";
            }
            if (admin.IsLocked == true)
            {
                return "locked";
            }

            if (admin != null && codes.Verify(password, admin.Password))
            {
                if (admin.IsLoggedIn == true)
                {
                    return "loggedin";
                }
                admin.LastLoggedIn = DateTime.Now.ToString();
                admin.UnSuccessfulAttempts = 0;
                admin.IsLoggedIn = true;
                _context.SaveChanges();
                return admin.AdminId.ToString();
            }
            if (admin.UnSuccessfulAttempts == 2)
            {
                admin.IsLocked = true;
                admin.UnSuccessfulAttempts ++ ;
                _context.SaveChanges();
                return "locked";
            }
            admin.UnSuccessfulAttempts ++;
            _context.SaveChanges();
            return "invalid";
        }
        [HttpGet("ForgotPassword/{mailid}")]
        public async Task<string> ForgotPassword(string mailid)
        {
            Random random = new();
            var admin = await _context.Admins.FirstOrDefaultAsync(a=>a.Email==mailid);
            if (admin == null)
            {
                return "noadmin";
            }
            otp = random.Next(100000, 999999);
            var subject = $"ShopX - {otp} is your verification code for secure access";
            var mailbody = $"Hi {admin.AdminName},\n\n" +
                $"We are sharing a verification code to access your account." +
                $"\nOnce verified you are redirected to reset your password." +
                $"\n\nYour OTP: {otp}\n\n" +
                $"Note: If you haven't raised this request please contact superiors as soon as possible.\n" +
                $"\nBest Regards,\n ShopX Team";
            try
            {
                codes.SendEmail(subject, mailbody, admin.Email);
            }
            catch (Exception)
            {
                return otp.ToString();
            }
            return otp.ToString();
        }


        //// DELETE: api/Admins/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteAdmin(int id)
        //{
        //    var admin = await _context.Admins.FindAsync(id);
        //    if (admin == null)
        //    {
        //        return NotFound();
        //    }

        //    admin.IsDeleted = true;
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        private bool AdminExists(int id)
        {
            return _context.Admins.Any(e => e.AdminId == id);
        }
    }
}
