using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL;
using Models;
using DA;

namespace ProyectoLenguajes.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private OrderBL orderBl;


        public OrdersController(ProyectoContext apiContext)
        {
            orderBl = new OrderBL(apiContext);
        }

        //GET: Orders/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Orden>>> Index(
            [FromQuery] string orderBy
        )
        {
            try
            {
                return await orderBl.GetAllOrders(orderBy);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //PUT: Orders/
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Dispatch(int id)
        {
            
            Orden existingOrder = await orderBl.GetOrderById(id);
            if (existingOrder == null)
            {
                return NotFound("La orden no existe");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await orderBl.EditOrderStatusToDispatched(id);
                    if (numberOfAffectedRows > 0)
                    {
                        return NoContent();
                    }
                    return Conflict("La orden ya fue despachada");
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

        //GET: Orders/
        [HttpGet("reporte-ventas")]
        public async Task<IActionResult> ObtenerReporteVentas()
        {
            var reporte = await orderBl.GenerarReporteVentasAsync();
            return Ok(reporte);
        }
    }
}
