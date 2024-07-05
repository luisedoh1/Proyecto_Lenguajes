import React from 'react';
import OrderList from '../components/Order/OrderList'; 
import './SalesPage.css';

export const SalesPage = () => {
    return (
        <div className="sales-page">
            <OrderList />
        </div>
    );
};