import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { fetchCategories } from './api';
import { useDispatch, useSelector } from 'react-redux';
import { increaseProductQuantity } from '../../store/cartSlice';
import axios from 'axios';
import './ProductModal.css';

export const ProductModal = ({ id, name, price, image, description, categorie, onClose }) => {
    const [foundCategory, setFoundCategory] = useState(null);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isLoggedIn);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setShowLoginMessage(true);
            return;
        }

        dispatch(increaseProductQuantity({ product: { id, name, price, image, quantity } }));
        alert(`${name} añadido al carrito`);
        console.log(quantity);

        const cartData = {
            idProducto: id,
            cantidad: quantity
        };

        const iduser = localStorage.getItem('idUsuario');
        if (!iduser) {
            console.error('No se encontró idUsuario en el local storage');
            return;
        }
        try {
            await axios.post(`https://luisedoh1-001-site1.etempurl.com/${iduser}/add`, cartData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
                        <div className="quantity-control">
                            <button onClick={handleDecreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncreaseQuantity}>+</button>
                        </div>
                        <button className="custom-add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                        {showLoginMessage && (
                            <div className="login-message">
                                To add items to the cart, first you have to login or sign up.
                            </div>
                        )}
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


