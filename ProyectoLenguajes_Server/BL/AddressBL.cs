using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DA;

namespace BL
{
    public class AddressBL
    {
        private readonly AddressDA _addressDA;

        public AddressBL(AddressDA addressDA)
        {
            _addressDA = addressDA;
        }

        // Añadir método de pago
        public async Task<int> createAddress(DireccionEntrega address)
        {
            try
            {
                return await _addressDA.createAddress(address);

            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Editar producto
        public async Task<int> editAddress(int id, DireccionEntrega address)
        {
            try
            {
                return await _addressDA.editAddress(id, address);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Eliminar método de pago por Id
        public async Task<int> deleteAddressById(int id)
        {
            try
            {
                return await _addressDA.deleteAddressById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener producto específico por Id
        public async Task<DireccionEntrega> getAddressById(int id)
        {
            try
            {
                return await _addressDA.getAddressById(id);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        //Obtener metodos de pago por Id
        public async Task<List<DireccionEntrega>> getAllAddressById(int metodoId, string orderBy, string orderType)
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

                return await _addressDA.GetAllAddressByUser(metodoId, orderByQuery + " " + orderTypeQuery);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
