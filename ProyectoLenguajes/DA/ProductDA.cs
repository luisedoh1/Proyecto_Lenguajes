﻿using Microsoft.EntityFrameworkCore;
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

        public async Task<List<Producto>> getAllProductsByCategory(int idCategory, string orderBy)
        {
            try
            {
                return await _context.Productos.Where(p=> p.CategoriaId == idCategory).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los productos por categoria");
            }
        }

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

        public async Task<List<Producto>> getAllProductsByTwoCharacteristic(int idCharacteristic1, int idCharacteristic2, string orderBy)
        {
            try
            {
                return await _context.Productos.Where(p => p.CaracteristicaId1 == idCharacteristic1 && p.CaracteristicaId2 == idCharacteristic2).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los productos por caracteristica 1");
            }
        }

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