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
            string token = _userService.GenerateJwt(dto);
            return Ok(token);
        }
    }
}
