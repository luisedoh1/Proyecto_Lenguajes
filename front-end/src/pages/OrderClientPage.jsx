import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetailsModal from '../components/Order/OrderDetailModal';
import '../components/Order/OrderList.css';

const OrderClientPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [orderTotals, setOrderTotals] = useState({});
    const userId = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/all/${userId}`);
                    setOrders(response.data);
                    response.data.forEach(order => calculateOrderTotal(order.idOrden));
                } else {
                    throw new Error('User ID not found');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const calculateOrderTotal = async (orderId) => {
        try {
            const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orderdetails/${orderId}`);
            const details = response.data;
            const total = details.reduce((sum, detail) => sum + detail.cantidad * detail.precioUnitario, 0);
            setOrderTotals(prevTotals => ({ ...prevTotals, [orderId]: total }));
        } catch (err) {
            console.error('Error calculating order total:', err.message);
        }
    };

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
        setShowModal(false);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="order-list-container">
            <h1 className="order-list-title">Order List</h1>
            <table className="order-list-table">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.idOrden}>
                                <td>{order.idOrden}</td>
                                <td>{order.fecha}</td>
                                <td>{order.estado}</td>
                                <td>${orderTotals[order.idOrden]?.toFixed(2) || 'Calculating...'}</td>
                                <td>
                                    <button className="open-modal-button" onClick={() => handleOpenModal(order)}>View Order Details</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found for this user.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showModal && selectedOrder && (
                <OrderDetailsModal orderId={selectedOrder.idOrden} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default OrderClientPage;
