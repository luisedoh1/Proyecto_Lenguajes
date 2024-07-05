import axios from 'axios';

export const updateOrderStatus = async (orderId, newStatus) => {
  const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/orders/${orderId}`, {
    estado: newStatus,
  });
  return response.data;
};