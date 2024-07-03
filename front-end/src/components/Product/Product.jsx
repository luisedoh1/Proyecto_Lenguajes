/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { CartContext } from '../Cart/CartContex';
import { FaCartShopping } from "react-icons/fa6";

const Product = ({ id, name, price, image }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    alert(`${name} añadido al carrito`);
  };

  return (
    <div className="product">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price}</p>
      <button className="product__button" onClick={handleAddToCart}>
        <FaCartShopping size={40} />
      </button>
    </div>
  );
};

export default Product;

