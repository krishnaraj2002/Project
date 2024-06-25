using System.ComponentModel.DataAnnotations;

namespace task_management_api.Models
{

    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DueDate { get; set; }
    }
}
