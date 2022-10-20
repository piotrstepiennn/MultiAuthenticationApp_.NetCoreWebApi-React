using Microsoft.EntityFrameworkCore;

namespace MultiAuthenticationAppAPI.Entities
{
    public class UserDbContext : DbContext
    {
        private string _connectionstring = "Data Source=DESKTOP-87LKHDF\\SQLEXPRESS;Initial Catalog=MultiAuthenticationApp;Integrated Security=True";
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionstring);
        } 
    }
}
