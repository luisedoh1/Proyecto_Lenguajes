using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly AddressBL _addressBL;

        public AddressController(AddressBL addressBL)
        {
            _addressBL = addressBL;
        }

        //POST: /payment
        [HttpPost]
        public async Task<ActionResult> Index([FromBody] DireccionEntrega direccion)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await _addressBL.createAddress(direccion);
                    if (numberOfAffectedRows > 0)
                    {
                        return CreatedAtAction(nameof(Index), new { id = direccion.IdDireccion }, direccion);
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
        public async Task<ActionResult<IEnumerable<DireccionEntrega>>> Index(
            int id,
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await _addressBL.getAllAddressById(id, orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // PUT: /payment/1
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Index(int id, DireccionEntrega address)
        {
            if (id != address.IdDireccion)
            {
                return BadRequest("El id de la direccion no es valido");

            }
            DireccionEntrega direcciobExistente = await _addressBL.getAddressById(id);
            if (direcciobExistente == null)
            {
                return NotFound("La direccion no existe");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await _addressBL.editAddress(id, address);
                    if (numberOfAffectedRows > 0)
                    {
                        return NoContent();
                    }
                    return Conflict("La direccion ya existe en la base de datos");
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
                DireccionEntrega direccionExistente = await _addressBL.getAddressById(id);
                if (direccionExistente == null)
                {
                    return NotFound("Metodo de pago no encontrado");
                }

                await _addressBL.deleteAddressById(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

    }
}
