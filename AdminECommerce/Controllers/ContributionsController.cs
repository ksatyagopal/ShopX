using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminECommerceAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace AdminECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContributionsController : ControllerBase
    {
        private readonly ECommerceAdminDBContext _context;

        public ContributionsController(ECommerceAdminDBContext context)
        {
            _context = context;
        }

        // GET: api/Contributions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contribution>>> GetContributions()
        {
            return await _context.Contributions.ToListAsync();
        }

        // GET: api/Contributions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contribution>> GetContribution(int id)
        {
            var contribution = await _context.Contributions.FindAsync(id);

            if (contribution == null)
            {
                return NotFound();
            }

            return contribution;
        }

        // PUT: api/Contributions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContribution(int id, Contribution contribution)
        {
            if (id != contribution.Cid)
            {
                return BadRequest();
            }

            _context.Entry(contribution).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContributionExists(id))
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

        // POST: api/Contributions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Contribution>> PostContribution(Contribution contribution)
        {
            contribution.ChangedTime = DateTime.Now.ToString();
            _context.Contributions.Add(contribution);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetContribution", new { id = contribution.Cid }, contribution);
        }

        // DELETE: api/Contributions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContribution(int id)
        {
            var contribution = await _context.Contributions.FindAsync(id);
            if (contribution == null)
            {
                return NotFound();
            }

            _context.Contributions.Remove(contribution);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContributionExists(int id)
        {
            return _context.Contributions.Any(e => e.Cid == id);
        }
    }
}
