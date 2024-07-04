using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class ProductoDA
    {
        private ProyectoContext _context;

        public ProductoDA(ProyectoContext context)
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


        // Obtener producto específico por id
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

        // Obtener producto específico por nombre
        public async Task<Producto> getProductByName(string name)
        {

            try
            {
                return await _context.Productos.Where(p => p.Nombre == name).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar el producto " + name);
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

        // Obtener producto por más vendidos
        public async Task<List<Producto>> GetProductosMasVendidos()
        {
            try
            {
                var productosMasVendidos = await _context.DetalleOrdens
                    .GroupBy(d => d.IdProducto)
                    .Select(g => new { IdProducto = g.Key, CantidadVendida = g.Sum(d => d.Cantidad) })
                    .OrderByDescending(g => g.CantidadVendida)
                    .Join(_context.Productos, g => g.IdProducto, p => p.IdProducto, (g, p) => p)
                    .ToListAsync();

                return productosMasVendidos;
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw;
            }
        }

        // Obtener producto ordenados por popularidad(Incluyendo hasta los que no tienen ventas)
        public async Task<List<Producto>> getPopularProducts()
        {
            try
            {
                var query = from od in _context.DetalleOrdens
                    group od by od.IdProducto
                    into g
                    orderby g.Count() descending
                    select new { IdProducto = g.Key, Count = g.Count() };

                var popularProductIds = await query.ToListAsync();

                var allProducts = await _context.Productos.ToListAsync();

                var popularProducts = allProducts.Select(p => new Producto
                {
                    IdProducto = p.IdProducto,
                    Codigo = p.Codigo,
                    Nombre = p.Nombre,
                    Descripcion = p.Descripcion,
                    Cantidad = p.Cantidad,
                    CategoriaId = p.CategoriaId,
                    Imagen = p.Imagen,
                    Precio = p.Precio,
                    CaracteristicaId1 = p.CaracteristicaId1,
                    CaracteristicaId2 = p.CaracteristicaId2,
                    FechaAñadido = p.FechaAñadido,
                    Popularity = popularProductIds.FirstOrDefault(pp => pp.IdProducto == p.IdProducto)?.Count ?? 0
                }).ToList();

                return popularProducts.OrderByDescending(p => p.Popularity).ToList();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw;
            }
        }

        // Agregar producto
        public async Task<int> createProduct(Producto product)
        {
            try
            {
                _context.Productos.Add(product);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar añadir el producto:" + product.ToString());
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
                existingProduct.FechaAñadido = DateTime.Now;
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
