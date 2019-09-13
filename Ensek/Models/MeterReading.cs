using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ensek.Models
{
    public class MeterReading
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public DateTime MeterReadingDateTime { get; set; }
        public string MeterReadValue { get; set; }
    }
}
