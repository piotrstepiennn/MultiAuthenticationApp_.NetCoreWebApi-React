using System.ComponentModel.DataAnnotations;

namespace MultiAuthenticationAppAPI.Entities
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Question { get; set; }
        [Required]
        public string Answer { get; set; }
        public string? EmailAuthcode { get; set; }
        public string? MobileAppAuthcode { get; set; }
        [Required]
        public string AuthPassword { get; set; }
        [Required]
        public string MobilePassword { get; set; }
        public string PhoneNumber { get; set; }
        
    }
}
