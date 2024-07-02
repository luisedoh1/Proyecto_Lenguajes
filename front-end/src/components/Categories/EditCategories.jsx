/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import edit from '../imgs/editar.gif'
import './EditCategories.css';

const EditCategories = ({ category }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoryData, setCategoryData] = useState(category);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({ ...categoryData, [name]: value });
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`https://fakestoreapi.com/categories/${category.id}`, categoryData);
            if (response.status !== 200) {
                throw new Error('Error editing the category');
            }
            alert('Categoryo editado');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="edit-category-container">
            <button className="edit-button" onClick={() => setShowModal(true)}>
                <img className="edit-icon" src={edit} alt="" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Category</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={categoryData.title}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={categoryData.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={categoryData.price}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={categoryData.category}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Img URL:
                            <input
                                type="text"
                                name="image"
                                value={categoryData.image}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={handleEdit} className="modal__button">
                            {loading ? 'Editting...' : 'Save changes'}
                        </button>
                        <button onClick={() => setShowModal(false)} className="modal__button cancel">
                            Cancel
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCategories;