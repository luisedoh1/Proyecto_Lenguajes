/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchCategories } from './api';
import { CartContext } from '../Cart/CartContex';
import './ProductModal.css';

export const ProductModal = ({ id, name, price, image, description, categorie, onClose }) => {
    const [foundCategory, setFoundCategory] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart({ id, name, price, image });
        alert(`${name} añadido al carrito`);
    };

    const product = useMemo(() => ({
        id,
        name,
        price,
        image,
        description,
        categorie
    }), [id, name, price, image, description, categorie]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                setCategories(fetchedCategories);
                const category = fetchedCategories.find(cat => cat.idCategoria === product.categorie);
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
        <div className="custom-modal-overlay" onClick={onClose}>
            <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
                <button className="custom-close-button" onClick={onClose}>X</button>
                <div className="custom-modal-body">
                    <img src={image} alt={name} className="custom-modal-image" />
                    <div className="custom-modal-details">
                        <h2 className="custom-modal-title">{name}</h2>
                        <p className="custom-modal-price">${price}</p>
                        <p className="custom-modal-description">{description}</p>
                        <p className="custom-modal-category">Category: {foundCategory ? foundCategory.nombre : 'Loading...'}</p>
                        <button className="custom-add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductModal.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ProductModal;

