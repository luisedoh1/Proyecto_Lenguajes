using DA;
using Models;

public class MetodoPagoBL
{
    private readonly MetodoPagoDA _metodoPagoDA;

    public MetodoPagoBL(MetodoPagoDA metodoPagoDA)
    {
        _metodoPagoDA = metodoPagoDA;
    }

    // Añadir método de pago
    public async Task<int> createMetodo(MetodoPago metodo)
    {
        try
        {
            return await _metodoPagoDA.createMetodo(metodo);

        }
        catch (Exception error)
        {
            throw new Exception(error.Message);
        }
    }

    // Editar metodo
    public async Task<int> editMetodo(int id, MetodoPago metodo)
    {
        try
        {
            return await _metodoPagoDA.editMetodo(id, metodo);
        }
        catch (Exception error)
        {
            throw new Exception(error.Message);
        }
    }

    // Eliminar método de pago por Id
    public async Task<int> deleteMetodoById(int id)
    {
        try
        {
            return await _metodoPagoDA.deleteMetodoById(id);
        }
        catch (Exception error)
        {
            throw new Exception(error.Message);
        }
    }

    // Obtener metodo específico por Id
    public async Task<MetodoPago> getMethodById(int id)
    {
        try
        {
            return await _metodoPagoDA.getMetodoById(id);
        }
        catch (Exception error)
        {
            throw new Exception(error.Message);
        }
    }

    //Obtener metodos de pago
    public async Task<List<MetodoPago>> getAllMethodsById(int metodoId, string orderBy, string orderType)
    {
        try
        {
            string orderByQuery = "IdMetodo";
            if (orderBy != null)
            {
                orderByQuery = orderBy;
            }
            string orderTypeQuery = "desc";
            if (orderType != null)
            {
                orderTypeQuery = orderType;
            }
            return await _metodoPagoDA.GetAllMetodosByUser(metodoId, orderByQuery+ " " + orderTypeQuery);
        }
        catch (Exception error)
        {
            throw new Exception(error.Message);
        }
    }
}