using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MultiAuthenticationAppAPI.Configuration;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Exceptions;
using MultiAuthenticationAppAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace MultiAuthenticationAppAPI.Services
{
    public interface IUserService
    {
        void RegisterUser(User user);
        string GenerateJwt(LoginDto dto);
        string GetAuthQuestion(LoginDto dto);
        void GenerateAuthCodes(LoginDto dto);
        string MobileLogin(MobileLoginDto dto);
        bool Authenticate(AuthDto dto);
        bool ChangeUsername(ChangeUsernameDto dto);
        bool ChangePassword(ChangePasswordDto dto);
        bool ChangeEmail(ChangeEmailDto dto);
    }

    public class UserService : IUserService
    {
        private readonly UserDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly Secrets _secrets;
        private readonly ILogger<UserService> _logger;
        private static readonly HttpClient _client = new HttpClient();

        public UserService(UserDbContext dbContext, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings, ILogger<UserService> logger, Secrets secrets )
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
            _logger = logger;
            _secrets = secrets;
        }

        public async void GenerateAuthCodes(LoginDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Invalid Username or password");
            }

            string mobileAuthCode = GenerateAuthCode();
            string emailAuthCode = GenerateAuthCode();

            user.EmailAuthcode = emailAuthCode;
            user.MobileAppAuthcode = mobileAuthCode;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();

            //sending email
            string emailFrom = _secrets.GMAIL_ACCOUNT;
            string emailPassword = _secrets.GMAIL_PASSWORD;
            MailMessage message = new MailMessage();
            message.From = new MailAddress(emailFrom);
            message.Subject = "Confirm Your Identity!";
            message.To.Add(new MailAddress(user.Email));
            message.Body = $"<html>\r\n  <body>\r\n    <center>\r\n  <p>\r\n  Hello {user.UserName}! </p>\r\n <p>\r\n      Rewrite the following code to confirm your identity\r\n    </p>\r\n    <p style=\"font-size:20px; font-weight: bold;\">\r\n     {emailAuthCode}\r\n      </p>\r\n      <p>\r\n      At the same time, the above code indicates the single letter of the additional authentication password, for example, the password described by code 3571 for the original password e.g. \"policeman\" will be represented by the letters \"lcmp\".\r\n      </p>\r\n    </center>\r\n  </body>\r\n</html>";
            message.IsBodyHtml= true;

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(emailFrom, emailPassword),
                EnableSsl = true,
            };

            smtpClient.Send(message);
            smtpClient.Dispose();


        }

        public string GenerateJwt(LoginDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if(user is null)
            {
                throw new BadRequestException("Invalid Username or password");
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if(passwordResult == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid Username or password");
            }

            _logger.LogInformation($"User with username {user.UserName} invoked login action.");

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, 
                claims, expires: expires, signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }

        public string GetAuthQuestion(LoginDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Invalid Username or password");
            }

            var authQuestion = user.Question + "*" + user.UserName + "*" + user.Email;
            return authQuestion;
        }

        public void RegisterUser(User user)
        {
            _logger.LogInformation($"New account created with username {user.UserName}.");
            var hashedPassword = _passwordHasher.HashPassword(user,user.Password);
            var hashedMobilePassword = _passwordHasher.HashPassword(user, user.MobilePassword);
            user.Password = hashedPassword;
            user.MobilePassword = hashedMobilePassword;

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public string MobileLogin(MobileLoginDto dto)
        {
            _logger.LogInformation($"Mobile Login action invoked by username with email {dto.Email}.");
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user is null)
            {
                throw new BadRequestException("Invalid email or password");
            }
            var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.MobilePassword, dto.MobilePassword);
            if (passwordResult == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid Username or password");
            }
            string result = $"{user.UserName}" + "*" + $"{user.MobileAppAuthcode}";
            return result;
        }

        public bool Authenticate(AuthDto dto)
        {
            _logger.LogInformation($"user with username {dto.UserName} invoked authenticate action.");
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Something went wrong!");
            }

            if(dto.EmailAuthcode.Length != 4  || dto.AuthPassword.Length != 4  || dto.MobileAppAuthcode.Length != 4 ) 
            {
                throw new BadRequestException("Wrong data length!");
            }

            char[] tmpArr = user.EmailAuthcode.ToCharArray();
            int[] letterIndex = new int[user.EmailAuthcode.Length]; 
            for (int i=0; i < user.EmailAuthcode.Length; i++)
            {
                letterIndex[i] = Convert.ToInt32(Char.GetNumericValue(tmpArr[i]));
            }

            for (int i = 0; i < 4; i++)
            {
                if (user.AuthPassword[(letterIndex[i])-1] != dto.AuthPassword[i]) return false;
            }

            if (user.EmailAuthcode == dto.EmailAuthcode && user.MobileAppAuthcode == dto.MobileAppAuthcode && user.Answer == dto.Answer )
            {
                return true;
            }
            else return false;
        }

        private static string GenerateAuthCode()
        {
            Random _rdm = new Random();
            string number = "";
            for (int i = 0; i < 4; i++)
            {
                int rand = _rdm.Next(1, 9);
                number += rand;
            }

            return number;
        }

        public bool ChangeUsername(ChangeUsernameDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Invalid username!");
            }
            _logger.LogInformation($"User with username {dto.UserName} changeUsername action invoked");
            var check = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.NewUserName);
            if ( check is not null) { return false; }

            if (user.Email != dto.Email) throw new BadRequestException("Invalid username!");

            user.UserName = dto.NewUserName;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return true;
        }

        public bool ChangeEmail(ChangeEmailDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user is null)
            {
                throw new BadRequestException("Invalid current Email!");
            }
            _logger.LogInformation($"User with Email {dto.Email} changeEmail action invoked");
            var check = _dbContext.Users.FirstOrDefault(u => u.Email == dto.NewEmail);
            if (check is not null) { return false; }

            if (user.UserName != dto.Username)
            {
                throw new BadRequestException("Invalid current Email!");
            }

            user.Email = dto.NewEmail;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return true;
        }

        public bool ChangePassword(ChangePasswordDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.Username);
            if (user is null)
            {
                throw new BadRequestException("Something went wrong!");
            }

            var passwordResult = _passwordHasher.VerifyHashedPassword(user, user.Password, dto.Password);
            if (passwordResult == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid current password!");
            }
            _logger.LogInformation($"User with username {dto.Username} changeEmail action invoked");
            user.Password = dto.NewPassword;
            var hashedPassword = _passwordHasher.HashPassword(user, user.Password);
            user.Password = hashedPassword;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
