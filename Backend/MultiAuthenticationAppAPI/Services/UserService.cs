using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Exceptions;
using MultiAuthenticationAppAPI.Models;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;
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

            string mobileAuthCode = GenerateRandomNumber(1000, 9999).ToString();
            string emailAuthCode = GenerateRandomNumber(1000, 9999).ToString();

            user.EmailAuthcode = emailAuthCode;
            user.MobileAppAuthcode = mobileAuthCode;

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();

            // TODO: mobileauthcode jednoczesnie bedzie numerkami dodatkowego hasla uwierzytelniajacego, napisac o tym wiadomosc w emailu.
            // ponizej dodac wysylanie emaili
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

            var authQuestion = user.Question;
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

        private static int GenerateRandomNumber(int _min, int _max)
        {
            Random _rdm = new Random();
            return _rdm.Next(_min, _max);
        }

    }
}
