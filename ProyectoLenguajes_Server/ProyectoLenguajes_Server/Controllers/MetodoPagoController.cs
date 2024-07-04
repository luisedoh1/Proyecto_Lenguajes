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

        [HttpPost]
        public async Task<IActionResult> AddMetodoPago([FromBody] MetodoPago metodoPago)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _metodoPagoBL.AddMetodoPago(metodoPago);
            if (result)
            {
                return Created();
            }

            return StatusCode(500, "No se pudo añadir el método de pago");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMetodoPago(int id)
        {
            var result = await _metodoPagoBL.DeleteMetodoPago(id);
            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }

        //GET:
        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> GetMetodosPagoByUsuarioId(int idUsuario)
        {
            var metodosPago = await _metodoPagoBL.GetMetodosPagoByUsuarioId(idUsuario);
            if (metodosPago == null || !metodosPago.Any())
            {
                return NotFound();
            }

            return Ok(metodosPago);
        }
    }
}
