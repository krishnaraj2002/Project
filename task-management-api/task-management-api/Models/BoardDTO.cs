using System.ComponentModel.DataAnnotations;

namespace task_management_api.Models
{
    public class BoardDTO
    {
        [Key]
        public int BoardId { get; set; }

        [Required]
        public string BoardName { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
