using BL;
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

        //POST: /metodopago
        [HttpPost]
        public async Task<ActionResult> Index([FromBody] MetodoPago metodo)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await _metodoPagoBL.createMetodo(metodo);
                    if (numberOfAffectedRows > 0)
                    {
                        return CreatedAtAction(nameof(Index), new { id = metodo.IdMetodo }, metodo);
                    }

                    return Conflict("El producto ya existe en la base de datos");
                }
                catch (Exception error)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT: /metodopago/1
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Index(int id, MetodoPago metodo)
        {
            if (id != metodo.IdMetodo)
            {
                return BadRequest("El id del metodo de pago no es valido");

            }
            MetodoPago existingMetodoPago = await _metodoPagoBL.getMethodById(id);
            if (existingMetodoPago == null)
            {
                return NotFound("El metodo no existe");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await _metodoPagoBL.editMetodo(id, metodo);
                    if (numberOfAffectedRows > 0)
                    {
                        return NoContent();
                    }
                    return Conflict("El metodo de pago ya existe en la base de datos");
                }
                catch (Exception error)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
                }

            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // Delete: /metodopago/1
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                MetodoPago metodoPago = await _metodoPagoBL.getMethodById(id);
                if (metodoPago == null)
                {
                    return NotFound("Metodo de pago no encontrado");
                }

                await _metodoPagoBL.deleteMetodoById(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }
    }
}
