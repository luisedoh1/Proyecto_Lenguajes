import React from 'react';
import Product from '../components/Product/Product';
import '../components/Product/Product.css';

const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'product1.jpg' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'product2.jpg' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'product3.jpg' },
];

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to our Ecommerce Store</h1>
      <div className="product-list">
        {products.map(product => (
          <Product key={product.id} name={product.name} price={product.price} image={product.image} />
        ))}
      </div>
    </div>
  );
};

export default Home;