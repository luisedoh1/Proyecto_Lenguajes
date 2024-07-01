using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;

namespace DA
{
    public class CarritoDA
    {
        private  ProyectoContext _context;

        public CarritoDA(ProyectoContext context)
        {
            _context = context;
        }

        public async Task<CarritoCompra> ObtenerCarritoPorUsuario(int userId)
        {
            return await _context.CarritoCompras.FirstOrDefaultAsync(c => c.IdUsuario == userId);
        }

        public async Task<int> CrearCarrito(CarritoCompra carrito)
        {
            _context.CarritoCompras.Add(carrito);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> AgregarProductoACarrito(DetalleCarrito detalle)
        {
            _context.DetalleCarritos.Add(detalle);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> EliminarProductoDelCarrito(int detalleCarritoId)
        {
            var detalle = await _context.DetalleCarritos.FindAsync(detalleCarritoId);
            if (detalle != null)
            {
                _context.DetalleCarritos.Remove(detalle);
                return await _context.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> ActualizarCantidadProductoCarrito(int detalleCarritoId, int nuevaCantidad)
        {
            var detalle = await _context.DetalleCarritos.FindAsync(detalleCarritoId);
            if (detalle != null && nuevaCantidad > 0)
            {
                detalle.Cantidad = nuevaCantidad;
                return await _context.SaveChangesAsync();
            }
            return 0;
        }
    }
}
