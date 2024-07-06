import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetailModal from './OrderDetailModal';
import './OrderList.css';

const OrderClient = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const userId = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orders/user/${userId}`);
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    const handleOpenModal = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseModal = () => {
        setSelectedOrder(null);
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
                                <td>${order.total}</td>
                                <td>
                                    <button onClick={() => handleOpenModal(order)}>View Details</button>
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
            {selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default OrderClient;
