using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MetodoPagoController : ControllerBase
    {
        private readonly MetodoPagoBL _metodoPagoBL;

        public MetodoPagoController(MetodoPagoBL metodoPagoBL)
        {
            _metodoPagoBL = metodoPagoBL;
        }

        // POST: /metodoPago
        [HttpPost]
        public async Task<IActionResult> AddMetodoPago([FromBody] MetodoPago metodoPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _metodoPagoBL.AddMetodoPago(metodoPago);
                if (result)
                {
                    return Created("", metodoPago);
                }

                return Conflict("No se pudo añadir el método de pago");
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // DELETE: /metodoPago/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMetodoPago(int id)
        {
            try
            {
                var result = await _metodoPagoBL.DeleteMetodoPago(id);
                if (result)
                {
                    return NoContent();
                }

                return NotFound("Método de pago no encontrado");
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // GET: /metodoPago/{idUsuario}
        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> GetMetodosPagoByUsuarioId(int idUsuario)
        {
            try
            {
                var metodosPago = await _metodoPagoBL.GetMetodosPagoByUsuarioId(idUsuario);
                if (metodosPago == null || !metodosPago.Any())
                {
                    return NotFound("No se encontraron métodos de pago para el usuario");
                }

                return Ok(metodosPago);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }
    }
}
