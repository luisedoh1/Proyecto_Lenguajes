import { useState, useEffect } from 'react';
import './HorizontalScroll.css';
import { fetchPopularProducts } from '../Product/api';
import Product from '../Product/Product';
import ProductModal from '../Product/ProductModal'; 
const HorizontalScroll = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchPopularProducts();
                setProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const openProductModal = (product) => {
        setSelectedProduct(product);
    }

    const closeProductModal = () => {
        setSelectedProduct(null);
    }

    return (
        <div className="scroll-container">
            <h1 className="products-title">Trending Products</h1>
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
                    <div key={product.idProducto} onClick={() => openProductModal(product)}>
                        <Product product={product} />
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <ProductModal
                    id={selectedProduct.idProducto}
                    name={selectedProduct.nombre}
                    price={selectedProduct.precio}
                    image={selectedProduct.imagen}
                    description={selectedProduct.descripcion}
                    categorie={selectedProduct.categoriaId}
                    onClose={closeProductModal}
                />
            )}
        </div>
    );
};

export default HorizontalScroll;
