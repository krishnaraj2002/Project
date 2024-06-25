using Microsoft.EntityFrameworkCore;

namespace task_management_api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Project> Projects { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProjectAssignment> UserProjectAssignments { get; set; }
        public DbSet<Progress> Progresses { get; set; }
        public DbSet<Board> Boards { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add any specific model configurations here
        }
    }
}