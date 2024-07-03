using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class CaracteristicaDA
    {
        private  ProyectoContext _context;

        public CaracteristicaDA(ProyectoContext context)
        {
            _context = context;
        }

        // Obtener todas las categorias
        public async Task<List<Caracteristica>> getAllCaracteristicas(string orderBy)
        {
            try
            {
                return await _context.Caracteristicas.OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar obtener las categorias");
            }
        }


    }
}
