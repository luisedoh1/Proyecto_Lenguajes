using DA;
using Models;

namespace BL
{
    public class CategoriaBL
    {
        private CategoriaDA categoriaDA;

        public CategoriaBL(ProyectoContext context)
        {
            categoriaDA = new CategoriaDA(context);
        }

        // Obtener categorias
        public async Task<List<Categoria>> getAllCategorias(string orderBy)
        {
            try
            {
                return await categoriaDA.getAllCategories(orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener categoria especifica
        public async Task<Categoria> getCategoriaById(int id)
        {
            try
            {
                return await categoriaDA.getCategoriaById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Agregar categoria
        public async Task<int> createCategory(Categoria categoria)
        {
            try
            {
                return await categoriaDA.createCategoria(categoria);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Editar categoria
        public async Task<int> editCategoria(int id, Categoria categoria)
        {
            try
            {
                return await categoriaDA.editCategoria(id, categoria);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Eliminar categoria
        public async Task<int> deleteCategoryById(int id)
        {
            try
            {
                return await categoriaDA.deleteCategoriaById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
