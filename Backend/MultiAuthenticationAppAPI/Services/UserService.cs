using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Exceptions;
using MultiAuthenticationAppAPI.Models;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Security.Claims;
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
    }

    public class UserService : IUserService
    {
        private readonly UserDbContext _dbContext;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public UserService(UserDbContext dbContext, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }

        public void GenerateAuthCodes(LoginDto dto)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Invalid Username or password");
            }

            string mobileAuthCode = GenerateRandomNumber();
            string emailAuthCode = GenerateRandomNumber();

            user.EmailAuthcode = emailAuthCode;
            user.MobileAppAuthcode = mobileAuthCode;

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();

            // TODO: mobileauthcode jednoczesnie bedzie numerkami dodatkowego hasla uwierzytelniajacego, napisac o tym wiadomosc w emailu.
            // ponizej dodac wysylanie emaili
            string emailFrom = "rokfarm32123@gmail.com";
            string emailPassword = "jxtbmzsvowosipry";
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

            //smtpClient.Send(message);
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

            var authQuestion = user.Question + "*" + user.UserName;
            return authQuestion;
        }

        public void RegisterUser(User user)
        {
            var hashedPassword = _passwordHasher.HashPassword(user,user.Password);
            var hashedMobilePassword = _passwordHasher.HashPassword(user, user.MobilePassword);
            user.Password = hashedPassword;
            user.MobilePassword = hashedMobilePassword;

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public string MobileLogin(MobileLoginDto dto)
        {
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
            var user = _dbContext.Users.FirstOrDefault(u => u.UserName == dto.UserName);
            if (user is null)
            {
                throw new BadRequestException("Something went wrong!");
            }

            if(dto.EmailAuthcode.Length != 4  || dto.AuthPassword.Length != 4  || dto.MobileAppAuthcode.Length != 4) 
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
                var test2 = user.AuthPassword[letterIndex[i] - 1];
                var testUser = user.AuthPassword[letterIndex[i]];
                if (user.AuthPassword[(letterIndex[i])-1] != dto.AuthPassword[i]) return false;
            }

            if (user.EmailAuthcode == dto.EmailAuthcode && user.MobileAppAuthcode == dto.MobileAppAuthcode && user.Answer == dto.Answer)
            {
                return true;
            }
            else return false;
        }

        private static string GenerateRandomNumber()
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

        
    }
}
