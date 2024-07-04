using Models;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

public class MetodoPagoDA
{
    private readonly ProyectoContext _context;

    public MetodoPagoDA(ProyectoContext context)
    {
        _context = context;
    }

    //Get Metodos de pago por medio del usuario
    public async Task<List<MetodoPago>> GetAllMetodosByUser(int idUsuario, string orderBy)
    {
        try
        {
            return await _context.MetodoPagos.Where(m => m.IdUsuario == idUsuario).OrderBy(orderBy).ToListAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine(error.Message);
            throw new Exception("Error al intentar obtener las ordenes por usuario");
        }
    }

    // Obtener metodo específico por id
    public async Task<MetodoPago> getMetodoById(int idMetodo)
    {

        try
        {
            return await _context.MetodoPagos.Where(m => m.IdMetodo == idMetodo).FirstOrDefaultAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine(error.Message);
            throw new Exception("Error al buscar el producto " + idMetodo);
        }
    }

    // Agregar metodo
    public async Task<int> createMetodo(MetodoPago metodo)
    {
        try
        {
            _context.MetodoPagos.Add(metodo);
            return await _context.SaveChangesAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine(error.Message);
            throw new Exception("Error al intentar añadir el producto:" + metodo.ToString());
        }
    }

    // Editar metodod
    public async Task<int> editMetodo(int productID, MetodoPago metodo)
    {
        try
        {
            MetodoPago existingMetodo = await getMetodoById(productID);
            existingMetodo.IdMetodo = metodo.IdMetodo;
            existingMetodo.IdTipo = metodo.IdTipo;
            existingMetodo.IdUsuario = metodo.IdUsuario;
            existingMetodo.Token = metodo.Token;
            return await _context.SaveChangesAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine(error.Message);
            throw new Exception("Error encontrado al intentar actualizar el metodo de pago:" + productID);
        }
    }

    // Eliminar metodo
    public async Task<int> deleteMetodoById(int id)
    {
        try
        {
            MetodoPago existingMetodo = await getMetodoById(id);
            _context.MetodoPagos.Remove(existingMetodo);
            return await _context.SaveChangesAsync();
        }
        catch (Exception error)
        {
            Console.WriteLine(error.Message);
            throw new Exception("Error al intentar eliminar el metodo de pago " + id);
        }
    }
}