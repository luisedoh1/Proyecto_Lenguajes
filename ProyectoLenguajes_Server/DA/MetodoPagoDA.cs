using Models;
using Microsoft.EntityFrameworkCore;

public class MetodoPagoDA
{
    private readonly ProyectoContext _context;

    public MetodoPagoDA(ProyectoContext context)
    {
        _context = context;
    }

    //Agragar metodo de pago
    public async Task<bool> AddMetodoPago(MetodoPago metodoPago)
    {
        _context.MetodoPagos.Add(metodoPago);
        return await _context.SaveChangesAsync() > 0;
    }

    //Eliminar el metodo de pago
    public async Task<bool> DeleteMetodoPago(int idMetodo)
    {
        var metodoPago = await _context.MetodoPagos.FindAsync(idMetodo);
        if (metodoPago == null) return false;

        _context.MetodoPagos.Remove(metodoPago);
        return await _context.SaveChangesAsync() > 0;
    }
    
    //Get Metodos de pago por medio del usuario
    public async Task<IEnumerable<MetodoPago>> GetMetodosPagoByUsuarioId(int idUsuario)
    {
        return await _context.MetodoPagos.Where(mp => mp.IdUsuario == idUsuario)
            .ToListAsync();
    }
}