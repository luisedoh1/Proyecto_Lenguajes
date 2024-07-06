using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA;

namespace BL
{
    public class CarritoBL
    {
        private CarritoDA _carritoDA; 

        public CarritoBL(ProyectoContext context)
        {
            _carritoDA = new CarritoDA(context);
        }

        // Obtener carrito por usuario
        public async Task<CarritoCompra> ObtenerCarritoPorUsuario(int userId)
        {
            try
            {
                return await _carritoDA.ObtenerCarritoPorUsuario(userId);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

    // Agregar producto del carrito
    public async Task<bool> AñadirProductoAlCarrito(int userId, DetalleCarrito detalle) 
        {
            var carrito = await _carritoDA.ObtenerCarritoPorUsuario(userId);
            if (carrito == null)
            {
                carrito = new CarritoCompra()
                {
                    IdUsuario = userId,
                    FechaCreacion = DateTime.Now
                };
                await _carritoDA.CrearCarrito(carrito);  
            }
            detalle.IdCarrito = carrito.IdCarrito;
            var result = await _carritoDA.AgregarProductoACarrito(detalle);
            return result > 0;
        }

        // Eliminar producto del carrito
        public async Task<bool> EliminarProductoDelCarrito(int detalleCarritoId)  
        {
            int result = await _carritoDA.EliminarProductoDelCarrito(detalleCarritoId);
            return result > 0;
        }

        // Actualizar la cantidad del producto en el carrito
        public async Task<bool> ActualizarCantidadProductoCarrito(int detalleCarritoId, int nuevaCantidad) 
        {
            int result = await _carritoDA.ActualizarCantidadProductoCarrito(detalleCarritoId, nuevaCantidad);
            return result > 0;
        }

        // Procesar la compra del carrito
        public async Task<bool> ProcesarCompra(int carritoId)
        {
            return await _carritoDA.ProcesarCompra(carritoId); 
        }
    }
}
