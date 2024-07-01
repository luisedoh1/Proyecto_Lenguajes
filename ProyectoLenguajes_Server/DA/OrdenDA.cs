﻿using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

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
                return await _context.Ordens.OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener las ordenes");
            }
        }

        // Obtener orden especifica por id
        public async Task<Orden> GetOrderById(int idOrden)
        {
            try
            {
                return await _context.Ordens.Where(o => o.IdOrden == idOrden).FirstOrDefaultAsync();
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
                return await _context.Ordens.Where(o => o.IdUsuario == idUsuario).OrderBy(orderBy).ToListAsync();
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

        // Editar orden para despacharla
        public async Task<int> EditOrderStatusToDispatched(int orderId)
        {
            try
            {
                Orden existingOrder = await GetOrderById(orderId);
                if (existingOrder == null)
                {
                    throw new Exception("Orden no encontrada");
                }

                existingOrder.Estado = "Despachado";

                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar el estado de la orden: " + orderId);
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

        //Obtener todas las ordenes con sus detalles(Se utiliza para el reporte de ventas)
        public async Task<List<Orden>> ObtenerOrdenesAsync()
        {
            return await _context.Ordens.Include(o => o.DetalleOrdens).ToListAsync();
        }

        public async Task<List<Orden>> GetOrdersByDate(string order)
        {
            string orderBy;

            if (order.ToLower() == "asc")
            {
                orderBy = "Fecha";
            }
            else if (order.ToLower() == "desc")
            {
                orderBy = "Fecha desc";
            }
            else
            {
                throw new ArgumentException("Parámetro de orden no válido");
            }

            return await GetAllOrders(orderBy);
        }

    }
}
