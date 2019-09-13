using Ensek.Models;
using Microsoft.EntityFrameworkCore;

namespace Ensek
{
    public class EnsekContext : DbContext
    {
        public EnsekContext(DbContextOptions<EnsekContext> options)
            : base(options)
        {
        }

        public DbSet<Account> Account { get; set; }
        public DbSet<MeterReading> MeterReading { get; set; }
    }
}