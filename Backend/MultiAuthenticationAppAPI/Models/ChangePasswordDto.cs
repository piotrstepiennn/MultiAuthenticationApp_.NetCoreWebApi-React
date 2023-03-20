namespace MultiAuthenticationAppAPI.Models
{
    public class ChangePasswordDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}
