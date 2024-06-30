using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace ProyectoLenguajes.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private CategoriaBL categoriaBL;

        public CategoriesController(ProyectoContext apiContext)
        {
            categoriaBL = new CategoriaBL(apiContext);
        }

        //GET: Categories/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categoria>>> Index(
            [FromQuery] string orderBy,
            [FromQuery] string orderType
        )
        {
            try
            {
                return await categoriaBL.getAllCategorias(orderBy, orderType);
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //GET: Categories/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> Index(int id)
        {
            try
            {
                Categoria category = await categoriaBL.getCategoriaById(id);

                if (category == null)
                {
                    return NotFound("Product not found for given ID");
                }
                return category;

            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }

        //POST: Categories/
        [HttpPost]
        public async Task<ActionResult> Index(Categoria category)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await categoriaBL.createCategory(category);
                    if (numberOfAffectedRows > 0)
                    {
                        return Created();
                    }

                    return Conflict("Product already exists in database");
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
        public async Task<IActionResult> Index(int id, Categoria category)
        {
            
            if (id != category.IdCategoria)
            {
                return BadRequest("The product id is not valid");

            }
            Categoria existingCategory = await categoriaBL.getCategoriaById(id);
            if (existingCategory == null)
            {
                return NotFound("Product does not exist");
            }
            if (ModelState.IsValid)
            {
                try
                {
                    int numberOfAffectedRows = await categoriaBL.editCategoria(id, category);
                    if (numberOfAffectedRows > 0)
                    {
                        return NoContent();
                    }
                    return Conflict("Product already exist in this database");
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
                Categoria category = await categoriaBL.getCategoriaById(id);
                if (category == null)
                {
                    return NotFound("Product not found");
                }

                await categoriaBL.deleteCategoryById(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, error.Message);
            }
        }
    }
}
