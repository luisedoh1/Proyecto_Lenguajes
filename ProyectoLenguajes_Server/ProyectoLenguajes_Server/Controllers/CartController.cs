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

        // POST: /{userId}/add
        [HttpPost("/{userId}/add")]
        public async Task<IActionResult> AddProductToCart(int userId, [FromBody] DetalleCarrito detalle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                bool isAdded = await _carritoBl.AñadirProductoAlCarrito(userId, detalle);
                if (isAdded)
                {
                    return NoContent();
                }
                return Conflict("El producto no se pudo añadir al carrito");
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // DELETE: /detalle/{detalleCarritoId}
        [HttpDelete("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> EliminarProductoDelCarrito(int detalleCarritoId)
        {
            try
            {
                bool isDeleted = await _carritoBl.EliminarProductoDelCarrito(detalleCarritoId);
                if (isDeleted)
                {
                    return NoContent();
                }
                return NotFound("Producto no encontrado en el carrito");
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // PUT: /detalle/{detalleCarritoId}
        [HttpPut("/detalle/{detalleCarritoId}")]
        public async Task<IActionResult> ActualizarCantidadProducto(int detalleCarritoId, [FromBody] int nuevaCantidad)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                bool isUpdated = await _carritoBl.ActualizarCantidadProductoCarrito(detalleCarritoId, nuevaCantidad);
                if (isUpdated)
                {
                    return Ok("Cantidad actualizada correctamente");
                }
                return BadRequest("No se pudo actualizar la cantidad");
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        // POST: /{carritoId}/procesar-compra
        [HttpPost("/{carritoId}/procesar-compra")]
        public async Task<IActionResult> FinalizarCompra(int carritoId)
        {
            try
            {
                bool success = await _carritoBl.ProcesarCompra(carritoId);
                if (success)
                {
                    return Ok("Compra finalizada y stock actualizado correctamente");
                }
                return BadRequest("No se pudo completar la compra");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
