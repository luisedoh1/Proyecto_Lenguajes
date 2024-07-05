using DA;
using Models;

namespace BL
{
    public class CaracteristicaBL
    {
        private CaracteristicaDA caracteristicaDA;

        public CaracteristicaBL(ProyectoContext context)
        {
            caracteristicaDA = new CaracteristicaDA(context);
        }

        // Obtener característica
        public async Task<List<Caracteristica>> getAllCaracteristicas(string orderBy, string orderType)
        {
            try
            {
                string orderByQuery = "IdCaracteristica";
                if (orderBy != null)
                {
                    orderByQuery = orderBy;
                }
                string orderTypeQuery = "asc";
                if (orderType != null)
                {
                    orderTypeQuery = orderType;
                }
                return await caracteristicaDA.getAllCaracteristicas(orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

    }
}
