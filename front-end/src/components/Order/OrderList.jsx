import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import { updateOrderStatus } from './api';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchOrderNumber, setSearchOrderNumber] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://luisedoh1-001-site1.etempurl.com/orders');
                setOrders(response.data);
                setFilteredOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleSearchByOrderNumber = (query) => {
        setSearchOrderNumber(query);
        const parsedQuery = parseInt(query, 10);
        if (!isNaN(parsedQuery)) {
            setFilteredOrders(
                orders.filter(order => order.idOrden === parsedQuery)
            );
        } else {
            setFilteredOrders(orders);
        }
    };

    const handleSearchByEmail = (query) => {
        setSearchEmail(query);
        const lowerCaseQuery = query.toLowerCase();
        setFilteredOrders(
            orders.filter(order => order.idUsuarioNavigation?.email && order.idUsuarioNavigation.email.toLowerCase().includes(lowerCaseQuery))
        );
    };

    const handleSearchByDate = () => {
        if (searchDate) {
            setFilteredOrders(
                orders.filter(order => order.fecha.includes(searchDate))
            );
        } else {
            setFilteredOrders(orders);
        }
    };

    const handleClearFilters = () => {
        setSearchOrderNumber('');
        setSearchEmail('');
        setSearchDate('');
        setFilteredOrders(orders);
    };

    useEffect(() => {
        handleSearchByDate();
    }, [searchDate, orders]);

    const handleStatusUpdate = async (orderId) => {
        try {
            await updateOrderStatus(orderId, 'Enviado');
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.idOrden === orderId ? { ...order, estado: 'Enviado' } : order
                )
            );
            setFilteredOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.idOrden === orderId ? { ...order, estado: 'Enviado' } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Error updating order status');
        }
    };

    return (
        <div className="order-list-container">
            <h1 className="order-list-title">Order List</h1>
            <SearchBar onSearch={handleSearchByOrderNumber} title={"Search Orders by Number"} value={searchOrderNumber} />
            <SearchBar onSearch={handleSearchByEmail} title={"Search Orders by Email"} value={searchEmail} />
            <div className="date-filter">
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="date-filter__input"
                    placeholder="Search Orders by Date (yyyy/mm/dd)"
                />
            </div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <>
                    <table className="order-list-table">
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Date</th>
                                <th>User Email</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Send Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.idOrden}>
                                    <td>{order.idOrden}</td>
                                    <td>{order.fecha}</td>
                                    <td>{order.idUsuarioNavigation?.email || 'No email available'}</td>
                                    <td>${order.total}</td>
                                    <td>{order.estado}</td>
                                    <td>
                                        <button
                                            onClick={() => handleStatusUpdate(order.idOrden)}
                                            disabled={order.estado === 'Enviado'}>
                                            Mark as Sent
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleClearFilters} className="clear-filters-button">Clear Filters</button>
                </>
            )}
        </div>
    );
};

export default OrderList;
