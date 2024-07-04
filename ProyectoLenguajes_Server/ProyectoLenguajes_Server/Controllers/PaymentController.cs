using BL;
using DA;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly MetodoPagoBL _metodoPagoBL;

        public PaymentController(MetodoPagoBL metodoPagoBL)
        {
            _metodoPagoBL = metodoPagoBL;
        }

        //POST: /payment
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

        //GET: /payment/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MetodoPago>>> Index(
            int id,
            [FromQuery] string orderBy
        )
        {
            try
            {
                return await _metodoPagoBL.getAllMethodsById(id, orderBy);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // PUT: /payment/1
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

        // Delete: /payment/1
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
