using System.ComponentModel.DataAnnotations;

namespace MetadataDatabase.Models
{
    public class Authenticate
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}