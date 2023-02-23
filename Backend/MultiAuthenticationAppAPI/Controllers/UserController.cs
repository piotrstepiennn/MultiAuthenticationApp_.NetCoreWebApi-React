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

        public UserController(IUserService userService)
        {
            _userService = userService; 
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
            _userService.GenerateAuthCodes(dto);
            string token = _userService.GenerateJwt(dto);
            string authQuestion = _userService.GetAuthQuestion(dto);
            var result = authQuestion.Split('*');
            return Ok(new { token, authQuestion = result[0], UserName = result[1] });
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
            else return BadRequest();
        }

    }
}
