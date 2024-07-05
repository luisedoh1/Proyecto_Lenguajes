/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import trasher from '../imgs/bote-de-basura.gif'
import './DeleteProduct.css'

export const DeleteProduct = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://luisedoh1-001-site1.etempurl.com/products/${id}`);
            if (response.status !== 200) {
                throw new Error('Error deleting the product');
            }
            alert('Producto eliminado');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-product-container">
            <button className="delete-button" onClick={handleDelete} disabled={loading}>
                {loading ? (
                    <div className="spinner"></div>
                ) : (
                    <img src={trasher} alt="Delete icon" className="delete-icon" />
                )}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}