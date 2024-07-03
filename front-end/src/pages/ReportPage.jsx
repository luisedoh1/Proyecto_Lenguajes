import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomPieChart from '../components/Reports/PieChart';
import './ReportPage.css'

export const ReportPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await axios.get('https://localhost:7105/Orders/reporte-ventas');
                setSalesData(response.data.detalleVentas);
                setTotalSales(response.data.totalVentas);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSalesData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Reporte de Ventas</h1>
            <p>Total Ventas: {totalSales}</p>
            <CustomPieChart data={salesData} />
        </div>
    );
};

