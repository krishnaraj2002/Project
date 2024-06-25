using System.ComponentModel.DataAnnotations;

namespace task_management_api.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string ImageUrl { get; set; }

    }
}
