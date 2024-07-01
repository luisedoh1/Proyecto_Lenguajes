import React, { useContext } from 'react';
import './Product.css';
import { CartContext } from '../Cart/CartContex';

const Product = ({ id, name, price, image }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  return (
    <div className="product">
      <img src={image} alt={name} className="product__image" />
      <h3 className="product__name">{name}</h3>
      <p className="product__price">${price}</p>
      <button className="product__button" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
