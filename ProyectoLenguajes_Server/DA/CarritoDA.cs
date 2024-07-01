using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public async Task<bool> ProcesarCompra(int carritoId)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var carrito = await _context.CarritoCompras
                        .Include(c => c.DetalleCarritos)
                        .ThenInclude(dc => dc.IdProductoNavigation)  
                        .FirstOrDefaultAsync(c => c.IdCarrito == carritoId);

                    if (carrito == null)
                        throw new Exception("Carrito no encontrado");

                    var orden = new Orden
                    {
                        IdUsuario = carrito.IdUsuario,
                        Fecha = DateTime.Now,
                        Estado = "En Proceso"
                    };
                    _context.Ordens.Add(orden);
                    await _context.SaveChangesAsync();

                    foreach (var item in carrito.DetalleCarritos)
                    {
                        var detalleOrden = new DetalleOrden()
                        {
                            IdOrden = orden.IdOrden,
                            IdProducto = item.IdProducto,
                            Cantidad = item.Cantidad,
                            PrecioUnitario = item.IdProductoNavigation.Precio 
                        };
                        _context.DetalleOrdens.Add(detalleOrden);

                        // Actualiza el stock revisando que existan suficientes unidades
                        if (item.IdProductoNavigation.Cantidad < item.Cantidad)
                            throw new Exception("Cantidad insuficiente en stock");

                        item.IdProductoNavigation.Cantidad -= item.Cantidad;
                    }

                    // Se limpia el carrito
                    _context.DetalleCarritos.RemoveRange(carrito.DetalleCarritos);
                    await _context.SaveChangesAsync();

                    transaction.Commit();  // Confirma todas las operaciones
                    return true;
                }
                catch (Exception error)
                {
                    transaction.Rollback();  // Revierte todas las operaciones en caso de error
                    Console.WriteLine(error.Message);
                    throw new Exception("Error al procesar la compra", error);
                }
            }
        }
    }
}
