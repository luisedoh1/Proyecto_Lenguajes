using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class ProductDA
    {
        private ProyectoContext _context;

        public ProductDA(ProyectoContext context)
        {
            _context = context;
        }

        // Obtener productos
        public async Task<List<Producto>> getAllProducts(string orderBy)
        {
            try
            {
                return await _context.Productos.OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener los productos");
            }
        }


        // Obtener producto especifico
        public async Task<Producto> getProductById(int idProduct)
        {

            try
            {
                return await _context.Productos.Where(p => p.IdProducto == idProduct).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar el producto " + idProduct);
            }
        }

        // Obtener productos de una categoria
        public async Task<List<Producto>> getAllProductsByCategory(int idCategory, string orderBy)
        {
            try
            {
                return await _context.Productos.Where(p => p.CategoriaId == idCategory).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los productos por categoria");
            }
        }

        // Obtener producto por una caracteristica
        public async Task<List<Producto>> getAllProductsByOneCharacteristic(int idCharacteristic1, string orderBy)
        {
            try
            {
                return await _context.Productos.Where(p => p.CaracteristicaId1 == idCharacteristic1).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los productos por caracteristica ");
            }
        }

        // Obtener producto por ambas caracteristicas
        public async Task<List<Producto>> getAllProductsByTwoCharacteristic(int idCharacteristic1, int idCharacteristic2, string orderBy)
        {
            try
            {
                return await _context.Productos.Where(p => p.CaracteristicaId1 == idCharacteristic1 && p.CaracteristicaId2 == idCharacteristic2).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los productos por caracteristica");
            }
        }

        // Agregar producto
        public async Task<int> createProducto(Producto producto)
        {
            try
            {
                _context.Productos.Add(producto);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al añadir el producto " + producto.ToString());
            }
        }

        // Editar producto
        public async Task<int> editProduct(int productID, Producto product)
        {
            try
            {
                Producto existingProduct = await getProductById(productID);
                existingProduct.Codigo = product.Codigo;
                existingProduct.Nombre = product.Nombre;
                existingProduct.Descripcion = product.Descripcion;
                existingProduct.Precio = product.Precio;
                existingProduct.CategoriaId = product.CategoriaId;
                existingProduct.Cantidad = product.Cantidad;
                existingProduct.CaracteristicaId1 = product.CaracteristicaId1;
                existingProduct.CaracteristicaId2 = product.CaracteristicaId2;
                existingProduct.Imagen = product.Imagen;
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar el producto:" + productID);
            }
        }

        // Eliminar producto
        public async Task<int> deleteProductById(int id)
        {
            try
            {
                Producto existingProduct = await getProductById(id);
                _context.Productos.Remove(existingProduct);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar eliminar el producto " + id);
            }
        }
    }
}
