namespace MultiAuthenticationAppAPI.Models
{
    public class AuthDto
    {
        public string UserName { get; set; }
        public string Answer { get; set; }
        public string EmailAuthcode { get; set; }
        public string MobileAppAuthcode { get; set; }
        public string AuthPassword { get; set; }
    }
}
