using DA;
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

        // Obtener productos
        public async Task<List<Orden>> getAllOrders(string orderBy, string orderType)
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
                return await _orderDa.getAllOrders(orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener orden especifica
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

        //Obtener ventas por fecha
        public async Task<List<Orden>> GetOrdersByDate(string orderBy, string orderType)
        {
            try
            {
                string orderByQuery = "Fecha";
                if (orderBy != null)
                {
                    orderByQuery = orderBy;
                }
                string orderTypeQuery = "asc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }
                return await _orderDa.getAllOrders(orderByQuery + " " + orderTypeQuery);
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

        //Editar estado de orden a despachado
        public async Task<int> EditOrderStatusToDispatched(int id)
        {
            try
            {
                return await _orderDa.EditOrderStatusToDispatched(id);
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
        public async Task<List<Orden>> GetAllOrdersByUser(int userId, string orderBy)
        {
            try
            {
                return await _orderDa.GetAllOrdersByUser(userId, orderBy);
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

        public async Task<ReporteVentasDto> GenerarReporteVentasAsync()
        {
            var ordenes = await _orderDa.ObtenerOrdenesAsync();
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
