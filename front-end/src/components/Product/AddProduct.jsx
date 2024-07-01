/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import add from '../imgs/mas.gif';
import './AddProduct.css';

const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        image: ''
    });
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        console.log(imageFile)
    };

    const handleAdd = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("category", productData.category);
        formData.append("image", imageFile);

        try {
            const response = await axios.post(`https://fakestoreapi.com/products/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            if (response.status !== 200) {
                throw new Error('Error adding the product');
            }
            alert('Product Added');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="add-product-container">
            <button className="add-button" onClick={() => setShowModal(true)}>
                <img className="add-icon" src={add} alt="Add product" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Product</h2>
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
                            Image:
                            <input
                                type="file"
                                name="image"
                                onChange={handleImageChange}
                                className="file-input"
                            />
                            <div className="drag-drop-area">
                                Drag and drop
                            </div>
                        </label>
                        <button onClick={handleAdd} className="modal__button">
                            {loading ? 'Adding...' : 'Save changes'}
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

export default AddProduct;
