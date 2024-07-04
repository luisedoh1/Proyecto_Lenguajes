using Models;

public class MetodoPagoBL
{
    private readonly MetodoPagoDA _metodoPagoDA;

    public MetodoPagoBL(MetodoPagoDA metodoPagoDA)
    {
        _metodoPagoDA = metodoPagoDA;
    }

    // Añadir método de pago
    public async Task<bool> AddMetodoPago(MetodoPago metodoPago)
    {
        
        return await _metodoPagoDA.AddMetodoPago(metodoPago);
    }

    // Eliminar método de pago por Id
    public async Task<bool> DeleteMetodoPago(int idMetodo)
    {
        
        return await _metodoPagoDA.DeleteMetodoPago(idMetodo);
    }

    //Obtener metodos de pago por Id
    public async Task<IEnumerable<MetodoPago>> GetMetodosPagoByUsuarioId(int idUsuario)
    {
        
        return await _metodoPagoDA.GetMetodosPagoByUsuarioId(idUsuario);
    }
}