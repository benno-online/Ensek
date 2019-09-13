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

            if (_context.MeterReading.Count() == 0)
            {
                // Create a new reading if collection is empty,
                // which means you can't delete all readings.
                _context.MeterReading.Add(new MeterReading { Id = 1 });
                _context.SaveChanges();
            }
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
    }
}