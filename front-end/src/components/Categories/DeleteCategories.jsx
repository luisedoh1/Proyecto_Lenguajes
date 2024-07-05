/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import trasher from '../imgs/bote-de-basura.gif'
import './DeleteCategories.css'

export const DeleteCategory = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`https://localhost:7105/categories/${id}`);
            if (response.status !== 204) {
                throw new Error('Error deleting the category');
            }
            alert('Category has been deleted');
            window.location.reload();
        } catch (error) {
            setError(error.message);
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="delete-category-container">
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
};

export default DeleteCategory;
