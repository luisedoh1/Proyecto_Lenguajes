/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import edit from '../imgs/editar.gif'
import './EditProduct.css';

const EditProduct = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState(product);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, productData);
            if (response.status !== 200) {
                throw new Error('Error editing the product');
            }
            alert('Producto editado');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="edit-product-container">
            <button className="edit-button" onClick={() => setShowModal(true)}>
                <img className= "edit-icon" src= {edit} alt="" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Product</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={productData.title}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={productData.description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Img URL:
                            <input
                                type="text"
                                name="image"
                                value={productData.image}
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

export default EditProduct;
