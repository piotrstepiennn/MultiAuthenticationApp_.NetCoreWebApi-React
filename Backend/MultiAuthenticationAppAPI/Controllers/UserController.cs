using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MultiAuthenticationAppAPI.Entities;
using MultiAuthenticationAppAPI.Models;
using MultiAuthenticationAppAPI.Services;

namespace MultiAuthenticationAppAPI.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IHashingService _hashingService;

        public UserController(IUserService userService, IHashingService hashingService)
        {
            _userService = userService; 
            _hashingService = hashingService;
        }

        [HttpPost("/register")]
        public ActionResult RegisterUser([FromBody]User user)
        {
            _userService.RegisterUser(user);
            return Ok();
        }

        [HttpPost("/login")]
        public ActionResult Login([FromBody] LoginDto dto )
        {
            var login = new HashDto { username = dto.UserName, password = dto.Password };
            var hash = _hashingService.ComputeSha1Hash(login);

            if(hash != dto.Hash)
            {
                return BadRequest("Data integrity error!");
            }

            _userService.GenerateAuthCodes(dto);
            string token = _userService.GenerateJwt(dto);
            string authQuestion = _userService.GetAuthQuestion(dto);
            var result = authQuestion.Split('*');
            return Ok(new { token, authQuestion = result[0], UserName = result[1], Email = result[2] });
        }

        [HttpPost("/mobileAuth")]
        public ActionResult MobileLogin([FromBody] MobileLoginDto dto)
        {
            string result = _userService.MobileLogin(dto);
            var user = result.Split('*');

            return Ok(new { UserName = user[0], MobileAppAuthcode = user[1] });
        }

        [HttpPost("/auth")]
        public ActionResult Authenticate([FromBody] AuthDto dto)
        {
            bool result = _userService.Authenticate(dto);
            if (result) return Ok();
            else return BadRequest("Authentication data is incorrect!");
        }

        [HttpPost("/user/changeUsername")]
        [Authorize]
        public ActionResult ChangeUserName([FromBody] ChangeUsernameDto dto)
        {
            bool result = _userService.ChangeUsername(dto);
            if (result) return Ok();
            else return BadRequest("New Username already taken!");
        }

        [HttpPost("/user/changeEmail")]
        public ActionResult ChangeEmail([FromBody] ChangeEmailDto dto)
        {
            bool result = _userService.ChangeEmail(dto);
            if (result) return Ok();
            else return BadRequest("New Email already taken!");
        }

        [HttpPost("/user/changePassword")]
        public ActionResult ChangePassword([FromBody] ChangePasswordDto dto)
        {
            bool result = _userService.ChangePassword(dto);
            if (result) return Ok();
            else return BadRequest("Something Went Wrong!");
        }

    }
}
