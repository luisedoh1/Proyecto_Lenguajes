using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DA
{
    public class OrdenDA
    {
        private ProyectoContext _context;

        public OrdenDA(ProyectoContext context)
        {
            _context = context;
        }

        // Obtener todas las ordenes
        public async Task<List<Orden>> GetAllOrders(string orderBy)
        {
            try
            {
                return await _context.Ordens
                    .OrderBy(orderBy)
                    .ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener las ordenes");
            }
        }

        // Obtener orden especifica
        public async Task<Orden> GetOrderById(int idOrden)
        {
            try
            {
                return await _context.Ordens
                    .Where(o => o.IdOrden == idOrden)
                    .FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar la orden: " + idOrden);
            }
        }

        // Obtener ordenes por usuario
        public async Task<List<Orden>> GetAllOrdersByUser(int idUsuario, string orderBy)
        {
            try
            {
                return await _context.Ordens
                    .Where(o => o.IdUsuario == idUsuario)
                    .OrderBy(orderBy)
                    .ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener las ordenes por usuario");
            }
        }

        // Obtener ordenes por estado
        public async Task<List<Orden>> GetAllOrdersByStatus(string status, string orderBy)
        {
            try
            {
                return await _context.Ordens
                    .Where(o => o.Estado == status)
                    .OrderBy(orderBy)
                    .ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener las ordenes por estado");
            }
        }

        // Agregar orden
        public async Task<int> CreateOrder(Orden orden)
        {
            try
            {
                _context.Ordens.Add(orden);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al añadir la orden: " + orden.ToString());
            }
        }

        // Editar orden
        public async Task<int> EditOrder(int orderId, Orden orden)
        {
            try
            {
                Orden existingOrder = await GetOrderById(orderId);
                if (existingOrder == null)
                {
                    throw new Exception("Orden no encontrada");
                }

                existingOrder.IdUsuario = orden.IdUsuario;
                existingOrder.Fecha = orden.Fecha;
                existingOrder.Estado = orden.Estado;
                existingOrder.DetalleOrdens = orden.DetalleOrdens;

                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar la orden: " + orderId);
            }
        }

        // Eliminar orden
        public async Task<int> DeleteOrderById(int id)
        {
            try
            {
                Orden existingOrder = await GetOrderById(id);
                if (existingOrder == null)
                {
                    throw new Exception("Orden no encontrada");
                }

                _context.Ordens.Remove(existingOrder);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar eliminar la orden " + id);
            }
        }
    }
}
