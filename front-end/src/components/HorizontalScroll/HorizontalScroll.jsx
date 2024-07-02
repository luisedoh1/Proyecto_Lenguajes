import { useState, useEffect } from 'react';
import './HorizontalScroll.css';
import { fetchProducts } from '../Product/api';
import Product from '../Product/Product';

const HorizontalScroll = () => {
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
        <div className="scroll-container">
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
            <div className="scroll-list">
                {products.map(product => (
                    <Product key={product.idProducto} id={product.idProducto} name={product.nombre} price={product.precio} image={product.imagen} />
                ))}
            </div>
        </div>
    );
};

export default HorizontalScroll;
