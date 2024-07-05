import React, { useState } from 'react';
import axios from 'axios';
import OrderDetailsModal from '../components/Order/OrderDetailsModal';
import './SearchOrderPage.css';

const SearchOrderPage = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (e) => {
        setOrderNumber(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/orders/${orderNumber}`);
            setOrder(response.data);
            setShowModal(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setOrder(null);
    };

    return (
        <div className="search-order-page">
            <h1>Search Your Order</h1>
            
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {order && showModal && (
                <OrderDetailsModal orderId={order.idOrden} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default SearchOrderPage;
