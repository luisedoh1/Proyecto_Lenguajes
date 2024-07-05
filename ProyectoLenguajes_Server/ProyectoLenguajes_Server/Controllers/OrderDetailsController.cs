using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private OrderDetailBL _orderDetailBL;

        public OrderDetailsController(ProyectoContext apiContext)
        {
            _orderDetailBL = new OrderDetailBL(apiContext);
        }

        //GET: /orderdetails/1
        [HttpGet("{idOrden:int}")]
        public async Task<ActionResult<IEnumerable<DetalleOrden>>> GetOrderDetailsByOid(int idOrden)
        {
            try
            {
                var orderDetails = await _orderDetailBL.getAllOrderDetailsByOid(idOrden);
                return Ok(orderDetails);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //POST: /orderdetails
        [HttpPost]
        public async Task<ActionResult> CreateOrderDetail([FromBody] DetalleOrden orderDetail)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await _orderDetailBL.createOrderDetail(orderDetail);
                    if (numberOfAffectedRows > 0)
                    {
                        return CreatedAtAction(nameof(CreateOrderDetail), new { id = orderDetail.IdDetalleOrden }, orderDetail);
                    }

                    return Conflict("El detalle de la orden ya existe en la base de datos");
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
    }

}
