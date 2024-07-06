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

        // GET: /usuarios/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Usuario>> GetUserById(int id)
        {
            try
            {
                Usuario usuario = await _userBl.getUserById(id);

                if (usuario == null)
                {
                    return NotFound("Usuario no encontrado para el id");
                }
                return Ok(usuario);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // GET: /usuarios/authenticate
        [HttpGet("authenticate")]
        public async Task<IActionResult> AuthenticateUser(string email, string password)
        {
            try
            {
                var user = await _userBl.AuthenticateUser(email, password);
                if (user == null)
                {
                    return NotFound("Usuario no encontrado");
                }

                var role = user.IdRolNavigation.Nombre;
                var userid = user.IdUsuario;
                return Ok(new { role , userid });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // POST: User/
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userBl.createUser(usuario);
                if (result > 0)
                {
                    return CreatedAtAction(nameof(CreateUser), new { email = usuario.Email }, usuario);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, "No se pudo añadir el usuario");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        // PUT: User/idUsuario/{idUsuario}
        [HttpPut("idUsuario/{userId}")]
        public async Task<IActionResult> EditUser(int userId, [FromBody] Usuario user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _userBl.editUser(userId, user);
                if (result > 0)
                {
                    return NoContent();
                }

                return NotFound("Usuario no encontrado");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }

}
