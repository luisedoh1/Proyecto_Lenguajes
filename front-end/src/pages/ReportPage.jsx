import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomPieChart from '../components/Reports/PieChart';
import './ReportPage.css';

export const ReportPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchSalesData = async (startDate, endDate) => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7105/Orders/reporte-ventas', {
                params: {
                    startDate,
                    endDate
                }
            });
            setSalesData(response.data.detalleVentas);
            setTotalSales(response.data.totalVentas);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData(startDate, endDate);
    }, [startDate, endDate]);

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleFilter = () => {
        fetchSalesData(startDate, endDate);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        fetchSalesData('', '');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="report-page-container">
            <h1 className="report-page-title">Reporte de Ventas</h1>
            <div className="filter-container">
                <div className="date-inputs">
                    <label>
                        Start Date:
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                    </label>
                </div>
                <div className="button-container">
                    <button className="filter-button" onClick={handleFilter}>Filter</button>
                    <button className="reset-button" onClick={handleReset}>Reset</button>
                </div>
            </div>
            <div className='total-sales'>
                <label>Total Ventas:</label>
            </div>
            <p className="total-sales">{'$' + totalSales}</p>
            <CustomPieChart data={salesData} />
            <div className="sales-table-container">
                <h2 className="sales-table-title">Detalle de Ventas</h2>
                <div className="sales-table-scroll">
                    <table className="sales-table">
                        <thead>
                            <tr>
                                <th>ID Orden</th>
                                <th>Fecha</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesData.map((venta) => (
                                <tr key={venta.iD_Orden}>
                                    <td>{venta.iD_Orden}</td>
                                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                                    <td>{'$' + venta.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
