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

        // Obtener todas las categorias
        public async Task<List<Categoria>> getAllCategories(string orderBy)
        {
            try
            {
                return await _context.Categoria.OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener las categorias");
            }
        }

        // Obtener categoria especifica
        public async Task<Categoria> getCategoriaById(int idCategoria)
        {

            try
            {
                return await _context.Categoria.Where(c => c.IdCategoria == idCategoria).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar la categoria: " + idCategoria);
            }
        }

        // Agregar categoria
        public async Task<int> createCategoria(Categoria categoria)
        {
            try
            {
                _context.Categoria.Add(categoria);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al añadir la categoria: " + categoria.ToString());
            }
        }

        // Editar categoria
        public async Task<int> editCategoria(int categoryID, Categoria categoria)
        {
            try
            {
                Categoria existingCategory = await getCategoriaById(categoryID);
                existingCategory.Nombre = categoria.Nombre;
                existingCategory.Descripcion = categoria.Descripcion;
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar la categoria:" + categoryID);
            }
        }

        // Eliminar categoria
        public async Task<int> deleteCategoriaById(int id)
        {
            try
            {
                Categoria existingCategory = await getCategoriaById(id);
                _context.Categoria.Remove(existingCategory);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar eliminar la categoria " + id);
            }
        }

    }
}
