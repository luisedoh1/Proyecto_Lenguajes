import { useState, useEffect } from 'react';
import './ProductsPage.css';
import { fetchProducts } from '../components/Product/api';
import Product from '../components/Product/Product';

export const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    return (
        <div className="products-container">
            <h1 className="products-title">Products</h1>
            {loading && (
                <div className="modal">
                    <div className="spinner"></div>
                    <h2>Loading Products...</h2>
                    <p>Please wait while we load the products for you.</p>
                </div>
            )}
            {error && (
                <div className="modal">
                    <h2>Error Loading Products</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}
            <div className="products-list">
                {products.map(product => (
                    <Product key={product.id} id={product.id} name={product.title} price={product.price} image={product.image} />
                ))}
            </div>
        </div>
    );
};

