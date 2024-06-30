using BL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        private ProductBL productBL;

        public ProductsController(ProyectoContext apiContext)
        {
            productBL = new ProductBL(apiContext);
        }

        //GET: Products/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> Index(
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await productBL.getAllProducts(orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: Products/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> Index(int id)
        {
            try
            {
                Producto product = await productBL.getProductById(id);

                if (product == null)
                {
                    return NotFound("Producto no encontrado para el id");
                }
                return product;

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: Products/1
        [HttpGet("{name}")]
        public async Task<ActionResult<Producto>> Index(string name)
        {
            try
            {
                Producto product = await productBL.getProductByName(name);

                if (product == null)
                {
                    return NotFound("Producto no encontrado para este nombre");
                }
                return product;

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }


        //POST: Product/
        [HttpPost]
        public async Task<ActionResult> Index(Producto product)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await productBL.createProduct(product);
                    if (numberOfAffectedRows > 0)
                    {
                        return Created();
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

        // PUT: Products/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Index(int id, Producto product)
        {
            if (id != product.IdProducto)
            {
                return BadRequest("El id de producto no es valido");

            }
            Producto existingProduct = await productBL.getProductById(id);
            if (existingProduct == null)
            {
                return NotFound("El producto no existe");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await productBL.editProduct(id, product);
                    if (numberOfAffectedRows > 0)
                    {
                        return NoContent();
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


        // Delete: Products/1
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                Producto product = await productBL.getProductById(id);
                if (product == null)
                {
                    return NotFound("Producto no encontrado");
                }

                await productBL.deleteProductById(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }
    }
}
