import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchCategories } from './api'; 
import { CartContext } from '../Cart/CartContex';

export const ProductModal = ({ id, name, price, image,description, onClose }) => {
    const [foundCategory, setFoundCategory] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart({ id, name, price, image });
        alert(`${name} añadido al carrito`);
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                const category = fetchedCategories.find(cat => cat.idCategoria === product.categoriaId);
                setFoundCategory(category);
            } catch (error) {
                setError(error.message);
            }
        };

        if (product) {
            getCategories();
        }
    }, [product]);

    if (!product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="modal-body">
                    <img src={image} alt={name} className="modal-image" />
                    <div className="modal-details">
                        <h2 className="modal-title">{name}</h2>
                        <p className="modal-price">${price}</p>
                        <p className="modal-description">{description}</p>
                        <p className="modal-category">Category: {foundCategory ? foundCategory.nombre : 'Loading...'}</p>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};



