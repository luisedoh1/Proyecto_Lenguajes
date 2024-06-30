using DA;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    internal class OrdenBL
    {
        private OrdenDA ordenDA;

        public OrdenBL(ProyectoContext context)
        {
            ordenDA = new OrdenDA(context);
        }

        // Obtener ordenes
        public async Task<List<Orden>> GetAllOrders(string orderBy)
        {
            try
            {
                return await ordenDA.GetAllOrders(orderBy);
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
                return await ordenDA.GetOrderById(id);
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
                return await ordenDA.CreateOrder(orden);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Editar orden
        public async Task<int> EditOrder(int id, Orden orden)
        {
            try
            {
                return await ordenDA.EditOrder(id, orden);
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
                return await ordenDA.DeleteOrderById(id);
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
                return await ordenDA.GetAllOrdersByUser(userId, orderBy);
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
                return await ordenDA.GetAllOrdersByStatus(status, orderBy);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        public async Task<ReporteVentasDto> GenerarReporteVentasAsync()
        {
            var ordenes = await ordenDA.ObtenerOrdenesAsync();
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
