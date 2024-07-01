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

        //GET: Categories/
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


    }
}
