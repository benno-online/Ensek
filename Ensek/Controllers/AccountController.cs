using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ensek.Models;

namespace Ensek.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly EnsekContext _context;

        public AccountController(EnsekContext context)
        {
            _context = context;
        }

        // GET: api/account
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> GetAccounts()
        {
            return await _context.Account.ToListAsync();
        }

        // GET: api/account/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(int id)
        {
            var account = await _context.Account.FindAsync(id);

            if (account == null)
            {
                return NotFound();
            }

            return account;
        }

        // POST: api/account
        [HttpPost]
        public async Task<ActionResult<Account>> PostAccount(Account account)
        {
            _context.Account.Add(account);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAccount), new { id = account.AccountId }, account);
        }
    }
}