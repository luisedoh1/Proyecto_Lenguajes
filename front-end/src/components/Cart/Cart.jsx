import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentModal from './PaymentModal';

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [idCart, setIdCart] = useState(null);
  const isAuthenticated = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const fetchCartProducts = async () => {
    const userId = localStorage.getItem('idUsuario');
    if (!userId) {
      console.error('No se encontró idUsuario en el local storage');
      return;
    }

    try {
      const cartResponse = await axios.get(`https://luisedoh1-001-site1.etempurl.com/cart/usuario/${userId}`);
      const { detalleCarritos } = cartResponse.data;
      setIdCart(cartResponse.data.idCarrito);
      const productPromises = detalleCarritos.map(async (detalle) => {
        const productResponse = await axios.get(`https://luisedoh1-001-site1.etempurl.com/Products/${detalle.idProducto}`);
        return {
          ...productResponse.data,
          cantidad: detalle.cantidad,
          idDetalleCarrito: detalle.idDetalleCarrito
        };
      });

      const products = await Promise.all(productPromises);
      setCartProducts(products);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleRemoveFromCart = async (idDetalleCarrito) => {
    try {
      await axios.delete(`https://luisedoh1-001-site1.etempurl.com/detalle/${idDetalleCarrito}`);
      fetchCartProducts();
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = async (paymentMethod, address) => {
    const iduser = localStorage.getItem('idUsuario');
    if (!iduser) {
      console.error('No se encontró idUsuario en el local storage');
      return;
    }

    try {
      for (const product of cartProducts) {
        const { idProducto, cantidad } = product;
        const item = { idProducto, cantidad, paymentMethod, address };

        await axios.post(`https://luisedoh1-001-site1.etempurl.com/${idCart}/procesar-compra`, item, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      alert("Compra procesada");
      fetchCartProducts();
      setShowPaymentModal(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const total = cartProducts.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartProducts.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartProducts.map(product => (
            <div key={product.idDetalleCarrito} className="cart-item">
              <img src={product.imagen} alt={product.nombre} className="cart-item__image" />
              <div className="cart-item__details">
                <h3>{product.nombre}</h3>
                <p>${product.precio}</p>
                <div className="quantity-control">
                  <span>Cantidad: {product.cantidad}</span>
                </div>
                <button className="cart-item__remove" onClick={() => handleRemoveFromCart(product.idDetalleCarrito)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
          </div>
          <button className="cart-checkout" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onPayment={handlePayment} />}
    </div>
  );
};
