using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private CarritoBL carritoBl;

        public CartController(ProyectoContext apiContext)
        {
            carritoBl = new CarritoBL(apiContext);
        }

        [HttpPost("/{userId}/add")]
        public async Task<IActionResult> AddProductToCart(int userId, [FromBody] DetalleCarrito detalle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isAdded = await _carritoBL.AñadirProductoAlCarrito(userId, detalle);
            if (isAdded)
            {
                return NoContent();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product to cart");
        }

        [HttpDelete("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> EliminarProductoDelCarrito(int detalleCarritoId)
        {
            bool isDeleted = await _carritoBL.EliminarProductoDelCarrito(detalleCarritoId);
            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpPut("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> ActualizarCantidadProducto(int detalleCarritoId, [FromBody] int nuevaCantidad)
        {
            bool isUpdated = await _carritoBL.ActualizarCantidadProductoCarrito(detalleCarritoId, nuevaCantidad);
            if (isUpdated)
            {
                return Ok();
            }
            return BadRequest("Unable to update quantity");
        }
    }
}
