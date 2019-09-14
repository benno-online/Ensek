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
    public class MeterReadingController : ControllerBase
    {
        private readonly EnsekContext _context;

        public MeterReadingController(EnsekContext context)
        {
            _context = context;
        }

        // GET: api/meterreading
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MeterReading>>> GetMeterReadings()
        {
            return await _context.MeterReading.ToListAsync();
        }

        // GET: api/meterreading/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeterReading>> GetMeterReading(int id)
        {
            var meterReading = await _context.MeterReading.FindAsync(id);

            if (meterReading == null)
            {
                return NotFound();
            }

            return meterReading;
        }
        // POST: api/meterreading
        [HttpPost]
        public async Task<ActionResult<Account>> PostTodoItem(MeterReading meterReading)
        {
            _context.MeterReading.Add(meterReading);
            await _context.SaveChangesAsync();

            // Check if the accountId exists 
            if (_context.Account.Any(o => o.AccountId == meterReading.AccountId))
            {
                return CreatedAtAction(nameof(GetMeterReading), new { id = meterReading.AccountId }, meterReading);
            }
            return BadRequest();
        }
    }
}