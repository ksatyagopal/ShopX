using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdminECommerceAPI.Models;

namespace AdminECommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly ECommerceAdminDBContext _context;

        public ChatsController(ECommerceAdminDBContext context)
        {
            _context = context;
        }

        // GET: api/Chats
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Chat>>> GetChats()
        //{
        //    return await _context.Chats.ToListAsync();
        //}

        // GET: api/Chats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChat(int id)
        {
            var chat = await (from i in _context.Chats
                        where i.MessageFrom == id || i.MessageTo == id
                        select i).ToListAsync();
            return chat;
        }

        // GET: api/Chats/5
        [HttpGet("newMessages/{id}")]
        public async Task<ActionResult<IEnumerable<Chat>>> AnyNewMessages(int id)
        {
            var chat = await (from i in _context.Chats
                              where i.MessageTo == id && i.IsViewed==false && i.IsCalled==false
                              select i).ToListAsync();
            foreach(var msg in chat)
            {
                msg.IsCalled = true;
            }
            _context.SaveChanges();
            return chat;
        }

        //// PUT: api/Chats/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutChat(int id, Chat chat)
        //{
        //    if (id != chat.ChatId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(chat).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ChatExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Chats
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat chat)
        {
            chat.SentTime = DateTime.Now;
            chat.IsViewed = false;
            chat.IsDeleted = false;
            chat.IsCalled = false;
            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChat", new { id = chat.ChatId }, chat);
        }

        // DELETE: api/Chats/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            var chat = await _context.Chats.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //private bool ChatExists(int id)
        //{
        //    return _context.Chats.Any(e => e.ChatId == id);
        //}
    }
}
