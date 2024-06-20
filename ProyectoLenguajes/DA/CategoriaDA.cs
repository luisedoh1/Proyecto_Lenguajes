using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class CategoriaDA
    {
        private ProyectoContext _context;

        public CategoriaDA(ProyectoContext context)
        {
            _context = context;
        }

        public async Task<List<Categoria>> getAllCategories(string orderBy)
        {
            try
            {
                return await _context.Categoria.OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener los productos");
            }
        }

        public async Task<Categoria> getCategoriaById(int idCategory)
        {

            try
            {
                return await _context.Categoria.Where(c => c.IdCategoria == idCategory).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar el producto " + idCategory);
            }
        }


    }
}
