using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using BL;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UsuarioBL _userBl;

        public UserController(UsuarioBL userBl)
        {
            _userBl = userBl;
        }

        // POST: /login
        [HttpPost("login")]
        public async Task<IActionResult> Login(string email, string contraseña)

        {
            try
            {

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            var user = await _userBl.AuthenticateUser(email, contraseña);

            if (user == null)
            {
                return Unauthorized();
            }

            var role = user.IdRolNavigation.Nombre;
            return Ok(new { role });
        }
    }
}
