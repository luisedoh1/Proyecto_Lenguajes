import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderDetailsModal from '../components/Order/OrderDetailModal';
import SearchBar from '../components/SearchBar/SearchBar';
import './SearchOrderPage.css';

const SearchOrderPage = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orders/${query}`);
            setOrder(response.data);
            calculateOrderTotal(response.data.idOrden); // Calculate order total
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const calculateOrderTotal = async (orderId) => {
        try {
            const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orderdetails/${orderId}`);
            const details = response.data;
            const total = details.reduce((sum, detail) => sum + detail.cantidad * detail.precioUnitario, 0);
            setOrderTotal(total);
        } catch (err) {
            console.error('Error calculating order total:', err.message);
        }
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="search-order-page">
            <h1>Search Your Order</h1>
            <SearchBar onSearch={handleSearch} title="Enter Order Number" />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {order && (
                <div className="order-details">
                    <h2>Order Details</h2>
                    <table className="order-details-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.idOrden}</td>
                                <td>{order.idUsuario}</td>
                                <td>{order.fecha}</td>
                                <td>{order.estado}</td>
                                <td>${orderTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="open-modal-button" onClick={handleOpenModal}>View Order Details</button>
                </div>
            )}
            {showModal && (
                <OrderDetailsModal orderId={order.idOrden} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SearchOrderPage;
