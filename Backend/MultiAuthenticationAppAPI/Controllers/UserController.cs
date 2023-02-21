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
            return Ok(new { token, authQuestion });
        }
    }
}
