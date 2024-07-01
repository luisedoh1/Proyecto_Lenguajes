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
        private CarritoBL _carritoBl;

        public CartController(ProyectoContext apiContext)
        {
            _carritoBl = new CarritoBL(apiContext);
        }

        [HttpPost("/{userId}/add")]
        public async Task<IActionResult> AddProductToCart(int userId, [FromBody] DetalleCarrito detalle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isAdded = await _carritoBl.AñadirProductoAlCarrito(userId, detalle);
            if (isAdded)
            {
                return NoContent();
            }

            return StatusCode(StatusCodes.Status500InternalServerError, "Error adding product to cart");
        }

        [HttpDelete("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> EliminarProductoDelCarrito(int detalleCarritoId)
        {
            bool isDeleted = await _carritoBl.EliminarProductoDelCarrito(detalleCarritoId);
            if (isDeleted)
            {
                return NoContent();
            }
            return NotFound();
        }

        [HttpPut("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> ActualizarCantidadProducto(int detalleCarritoId, [FromBody] int nuevaCantidad)
        {
            bool isUpdated = await _carritoBl.ActualizarCantidadProductoCarrito(detalleCarritoId, nuevaCantidad);
            if (isUpdated)
            {
                return Ok();
            }
            return BadRequest("Unable to update quantity");
        }

        [HttpPost("/{carritoId}/procesar-compra")]
        public async Task<IActionResult> FinalizarCompra(int carritoId)
        {
            try
            {
                bool success = await _carritoBl.ProcesarCompra(carritoId);
                if (success)
                    return Ok("Compra finalizada y stock actualizado correctamente");
                else
                    return BadRequest("No se pudo completar la compra");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
