using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class OrderDetailDA
    {
        private ProyectoContext _context;

        public OrderDetailDA(ProyectoContext context)
        {
            _context = context;
        }

        // Obtener detalles de las ordenes por usuario
        public async Task<List<Orden>> getAllOrderDetailsByOid(int idOrden, string orderBy)
        {
            try
            {
                return await _context.Ordens.Where(o => o.IdOrden == idOrden).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener los detalles de las ordenes del usuario");
            }
        }

        // Agregar detalle de orden
        public async Task<int> createOrderDetail(DetalleOrden ordenD)
        {
            try
            {
                _context.DetalleOrdens.Add(ordenD);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al añadir la orden: " + ordenD.ToString());
            }
        }
    }
}
