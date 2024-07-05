using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
using DA;

namespace BL
{
    public class OrderDetailBL
    {
        private OrderDetailDA _orderDetailDa;

        public OrderDetailBL(ProyectoContext context)
        {
            _orderDetailDa = new OrderDetailDA(context);
        }

        // Obtener detalles de las órdenes por ID de orden
        public async Task<List<DetalleOrden>> getAllOrderDetailsByOid(int idOrden)
        {
            try
            {
                return await _orderDetailDa.getAllOrderDetailsByOid(idOrden);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Crear detalle de orden
        public async Task<int> createOrderDetail(DetalleOrden orderDetail)
        {
            try
            {
                return await _orderDetailDa.createOrderDetail(orderDetail);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
