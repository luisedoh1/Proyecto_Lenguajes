using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;
using Models;

namespace DA
{
    public class AddressDA
    {
        private readonly ProyectoContext _context;

        public AddressDA(ProyectoContext context)
        {
            _context = context;
        }

        //Get direcciones del id usuario
        public async Task<List<DireccionEntrega>> GetAllAddressByUser(int idUsuario, string orderBy)
        {
            try
            {
                return await _context.DireccionEntregas.Where(d => d.IdUsuario == idUsuario).OrderBy(orderBy).ToListAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar obtener las direcciones por usuario");
            }
        }

        // Obtener direccion específico por id
        public async Task<DireccionEntrega> getAddressById(int idDireccion)
        {
            try
            {
                return await _context.DireccionEntregas.Where(d => d.IdDireccion == idDireccion).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar la direccion" + idDireccion);
            }
        }

        // Agregar direccion
        public async Task<int> createAddress(DireccionEntrega address)
        {
            try
            {
                _context.DireccionEntregas.Add(address);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar añadir la direccion:" + address.ToString());
            }
        }

        // Editar direccion
        public async Task<int> editAddress(int id, DireccionEntrega direccion)
        {
            try
            {
                DireccionEntrega existingDireccion = await getAddressById(id);
                existingDireccion.Direccion = direccion.Ciudad;
                existingDireccion.CodigoPostal = direccion.CodigoPostal;
                existingDireccion.Pais = direccion.Pais;
                existingDireccion.IdUsuario = direccion.IdUsuario;
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar la direccion:" + id);
            }
        }

        // Eliminar direccion
        public async Task<int> deleteAddressById(int id)
        {
            try
            {
                DireccionEntrega existingDireccion = await getAddressById(id);
                _context.DireccionEntregas.Remove(existingDireccion);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al intentar eliminar la direccion" + id);
            }
        }
    }
}
