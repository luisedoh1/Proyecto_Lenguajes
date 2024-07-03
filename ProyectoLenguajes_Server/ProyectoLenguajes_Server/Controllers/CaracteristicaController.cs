using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CaracteristicaController : ControllerBase
    {

        private CaracteristicaBL caracteristicaBL;

        public CaracteristicaController(ProyectoContext apiContext)
        {
            caracteristicaBL = new CaracteristicaBL(apiContext);
        }

        //GET: Caracteristicas/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Caracteristica>>> Index(
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await caracteristicaBL.getAllCaracteristicas(orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }
    }
}
