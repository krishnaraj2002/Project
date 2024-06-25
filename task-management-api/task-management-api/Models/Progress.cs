using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace task_management_api.Models
{
    public class Progress
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Project")]
        public int ProjectId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        [Range(0, 100)]
        public decimal CompletionOfWork { get; set; }

        public Project Project { get; set; }
        public User User { get; set; }
    }
}
