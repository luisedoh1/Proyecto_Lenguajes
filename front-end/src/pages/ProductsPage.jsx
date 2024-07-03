
import './ProductsPage.css';
import { ProductCatalog } from '../components/Product/ProductCatalog';

export const ProductsPage = () => {

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
                    <Product key={product.idProducto} id={product.idProducto} name={product.nombre} price={product.precio} image={product.imagen} />
                ))}
            </div>
        </div>
    );
};

