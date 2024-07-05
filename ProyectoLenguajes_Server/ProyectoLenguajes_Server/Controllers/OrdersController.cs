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

        //GET: /orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrdenDto>>> Index(
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await orderBl.getAllOrders(orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: /orders/1
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Orden>>> Index(int id)
            
        {
            try
            {
                Orden existingOrder = await orderBl.GetOrderById(id);
                if (existingOrder == null)
                {
                    return NotFound("La orden no existe");
                }

                return Ok(existingOrder);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: /orders/all/1
        [HttpGet("/all/{id}")]
        public async Task<ActionResult<IEnumerable<Orden>>> Index(
            int id,
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await orderBl.GetAllOrdersByUser(id, orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //PUT: /orders
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
                    int numberOfAffectedRows = await orderBl.EnviarOrden(id);
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

        // GET: /orders/reporte-ventas
        [HttpGet("reporte-ventas")]
        public async Task<ActionResult> ReporteVentas(DateTime? startDate, DateTime? endDate)
        {
            try
            {
                var report = await orderBl.GenerarReporteVentasAsync(startDate, endDate);
                return Ok(report);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }


    }
}
