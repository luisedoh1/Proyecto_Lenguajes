﻿using DA;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class OrderBL
    {
        private OrderDA _orderDa;

        public OrderBL(ProyectoContext context)
        {
            _orderDa = new OrderDA(context);
        }

        // Obtener ordenes
        public async Task<List<OrdenDto>> getAllOrders(string orderBy, string orderType)
        {
            try
            {
                string orderByQuery = "Fecha";
                if (orderBy != null)
                {
                    orderByQuery = orderBy;
                }
                string orderTypeQuery = "desc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }

                var orders = await _orderDa.getAllOrders(orderByQuery + " " + orderTypeQuery);
                return orders.Select(o => new OrdenDto
                {
                    IdOrden = o.IdOrden,
                    IdUsuario = o.IdUsuario,
                    Fecha = o.Fecha,
                    Estado = o.Estado,
                    IdUsuarioNavigation = o.IdUsuarioNavigation,
                    DetalleOrdens = o.DetalleOrdens,
                    Total = o.DetalleOrdens.Sum(d => d.Cantidad * d.PrecioUnitario)
                }).ToList();



            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener orden especifica por Id
        public async Task<Orden> GetOrderById(int id)
        {
            try
            {
                return await _orderDa.GetOrderById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }


        // Agregar orden
        public async Task<int> CreateOrder(Orden orden)
        {
            try
            {
                return await _orderDa.CreateOrder(orden);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        //Editar estado de orden a enviado
        public async Task<int> EnviarOrden(int id)
        {
            try
            {
                return await _orderDa.EnviarOrden(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }


        // Eliminar orden
        public async Task<int> DeleteOrderById(int id)
        {
            try
            {
                return await _orderDa.DeleteOrderById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener ordenes por usuario
        public async Task<List<Orden>> GetAllOrdersByUser(int userId, string orderBy, string orderType)
        {
            try
            {
                string orderByQuery = "IdOrden";
                if (orderBy != null)
                {
                    orderByQuery = orderBy;
                }
                string orderTypeQuery = "desc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }
                return await _orderDa.GetAllOrdersByUser(userId, orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener ordenes por estado
        public async Task<List<Orden>> GetAllOrdersByStatus(string status, string orderBy)
        {
            try
            {
                return await _orderDa.GetAllOrdersByStatus(status, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        //Se genera el reporte de ventas
        public async Task<ReporteVentasDto> GenerarReporteVentasAsync(DateTime? startDate, DateTime? endDate)
        {
            var ordenes = await _orderDa.ObtenerOrdenesAsync(startDate, endDate);
            var reporte = new ReporteVentasDto();

            foreach (var orden in ordenes)
            {
                var totalOrden = orden.DetalleOrdens.Sum(d => d.Cantidad * d.PrecioUnitario);
                reporte.TotalVentas += totalOrden;
                reporte.DetalleVentas.Add(new DetalleVentaDto
                {
                    ID_Orden = orden.IdOrden,
                    Fecha = orden.Fecha,
                    Total = totalOrden
                });
            }

            return reporte;
        }
    }

    public class OrdenDto
    {
        public int IdOrden { get; set; }
        public int IdUsuario { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
        public ICollection<DetalleOrden> DetalleOrdens { get; set; }
        public decimal Total { get; set; }
    }

    public class ReporteVentasDto
    {
        public decimal TotalVentas { get; set; }
        public List<DetalleVentaDto> DetalleVentas { get; set; } = new List<DetalleVentaDto>();
    }

    public class DetalleVentaDto
    {
        public int ID_Orden { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }
    }
}
