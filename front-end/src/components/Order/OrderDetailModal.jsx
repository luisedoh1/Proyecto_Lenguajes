import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetailModal.css';

const OrderDetailsModal = ({ orderId, onClose }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orderdetails/${orderId}`);
                const details = response.data;
                
                const productPromises = details.map(detail => 
                    axios.get(`https://luisedoh1-001-site1.etempurl.com/products/${detail.idProducto}`)
                );

                const products = await Promise.all(productPromises);
                const productsMap = products.reduce((acc, productResponse) => {
                    acc[productResponse.data.idProducto] = productResponse.data.nombre;
                    return acc;
                }, {});

                const detailsWithProductNames = details.map(detail => ({
                    ...detail,
                    nombreProducto: productsMap[detail.idProducto]
                }));

                setOrderDetails(detailsWithProductNames);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Order Details</h2>
                <table className="order-details-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.map(detail => (
                            <tr key={detail.idDetalleOrden}>
                                <td>{detail.nombreProducto}</td>
                                <td>{detail.cantidad}</td>
                                <td>${detail.precioUnitario}</td>
                                <td>${detail.cantidad * detail.precioUnitario}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={onClose} className="close-modal-button">Close</button>
            </div>
        </div>
    );
};

export default OrderDetailsModal;
