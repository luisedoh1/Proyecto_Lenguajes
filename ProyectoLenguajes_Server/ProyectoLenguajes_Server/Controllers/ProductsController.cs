using BL;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes_Server.Controllers
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

        //GET: /products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> Index(
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                if (orderBy == "popularidad")
                {
                    var popularProducts = await productBL.getPopularProducts();
                    return popularProducts.OrderByDescending(p => p.Popularity).ToList();
                }
                else
                {
                    var products = await productBL.getAllProducts(orderBy, orderType);
                    return products;
                }
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: /products/1
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Producto>> GetProductById(int id)
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

        //GET: /products/{name}
        [HttpGet("{name}")]
        public async Task<ActionResult<Producto>> GetProductByName(string name)
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

        // GET: /products/masvendidos
        [HttpGet("masvendidos")]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductosMasVendidos()
        {
            try
            {
                var productos = await productBL.GetProductosMasVendidos();
                return Ok(productos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        //POST: /product
        [HttpPost]
        public async Task<ActionResult> Index([FromBody] Producto product)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await productBL.createProduct(product);
                    if (numberOfAffectedRows > 0)
                    {
                        return CreatedAtAction(nameof(Index), new { id = product.IdProducto }, product);
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

        // PUT: /products/1
        [HttpPut("{id:int}")]
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


        // Delete: /products/1
        [HttpDelete("{id:int}")]
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
