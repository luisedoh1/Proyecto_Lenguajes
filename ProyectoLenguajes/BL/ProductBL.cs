using DA;
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
        private ProductDA productDA;

        public ProductBL(ProyectoContext context)
        {
            productDA = new ProductDA(context);
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
                string orderTypeQuery = "asc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }
                return await productDA.getAllProducts(orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto específico
        public async Task<Producto> getProductById(int id)
        {
            try
            {
                return await productDA.getProductById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Agregar producto
        public async Task<int> createProduct(Producto producto)
        {
            try
            {
                return await productDA.createProducto(producto);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Editar producto
        public async Task<int> editProduct(int id, Producto producto)
        {
            try
            {
                return await productDA.editProduct(id, producto);
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
                return await productDA.deleteProductById(id);
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
                return await productDA.getAllProductsByCategory(categoryId, orderBy);
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
                return await productDA.getAllProductsByOneCharacteristic(idCharacteristic1, orderBy);
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
                return await productDA.getAllProductsByTwoCharacteristic(idCharacteristic1, idCharacteristic2, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
