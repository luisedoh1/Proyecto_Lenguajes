/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
import { increaseProductQuantity } from '../../store/cartSlice'; 

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imagen} alt={product.nombre} className="product-image" />
      <h3 className="product-name">{product.nombre}</h3>
      <p className="product-price">${product.precio}</p>
    </div>
  );
};

export default Product;
