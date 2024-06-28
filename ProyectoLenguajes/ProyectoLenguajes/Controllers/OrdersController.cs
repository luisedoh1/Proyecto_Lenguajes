using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace ProyectoLenguajes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private ProductoBL productoBL();
        public OrdersController() { }
    }
}
