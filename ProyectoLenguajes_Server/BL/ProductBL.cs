using DA;
using Microsoft.AspNetCore.Http;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProductBL
    {
        private ProductoDA _productoDa;

        public ProductBL(ProyectoContext context)
        {
            _productoDa = new ProductoDA(context);
        }

        // Obtener productos
        public async Task<List<Producto>> getAllProducts(string orderBy, string orderType)
        {
            try
            {
                string orderByQuery = "Codigo";
                if (orderBy != null)
                {
                    orderByQuery = orderBy;
                }
                string orderTypeQuery = "desc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }
                return await _productoDa.getAllProducts(orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto específico por id
        public async Task<Producto> getProductById(int id)
        {
            try
            {
                return await _productoDa.getProductById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto específico por nombre
        public async Task<Producto> getProductByName(string name)
        {
            try
            {
                return await _productoDa.getProductByName(name);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Agregar producto
        public async Task<int> createProduct(Producto producto, IFormFile file)
        {
            return await _productoDa.createProducto(producto, file);
        }

        // Editar producto
        public async Task<int> editProduct(int id, Producto producto)
        {
            try
            {
                return await _productoDa.editProduct(id, producto);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Eliminar producto
        public async Task<int> deleteProductById(int id)
        {
            try
            {
                return await _productoDa.deleteProductById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener productos de una categoría
        public async Task<List<Producto>> getAllProductsByCategory(int categoryId, string orderBy)
        {
            try
            {
                return await _productoDa.getAllProductsByCategory(categoryId, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto por una caracteristica
        public async Task<List<Producto>> getAllProductsByOneCharacteristic(int idCharacteristic1, string orderBy)
        {
            try
            {
                return await _productoDa.getAllProductsByOneCharacteristic(idCharacteristic1, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto por ambas caracteristicas
        public async Task<List<Producto>> getAllProductsByTwoCharacteristic(int idCharacteristic1, int idCharacteristic2, string orderBy)
        {
            try
            {
                return await _productoDa.getAllProductsByTwoCharacteristic(idCharacteristic1, idCharacteristic2, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
