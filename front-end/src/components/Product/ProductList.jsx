import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import { DeleteProduct } from "./DeleteProduct";
import SearchBar from "../SearchBar/SearchBar";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct"
import "./ProductList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
                setFilteredProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const handleSearchName = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.title.toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    const handleSearchId = (query) => {
        setFilteredProducts(
            products.filter((product) => product.id.toString() === query)
        );
    };

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Product List</h1>
            <SearchBar onSearch={handleSearchName} title={"Buscar por nombre"} />
            <SearchBar onSearch={handleSearchId} title={"Buscar por Id"} />
            <AddProduct />
            {loading && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="spinner"></div>
                        <h2>Loading Products...</h2>
                        <p>Please wait while we load the products for you.</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Error Loading Products</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Retry</button>
                    </div>
                </div>
            )}
            {!loading && !error && (
                <div className="product-list-scroll">
                    <table className="product-list-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0
                                ? filteredProducts.map((product) => (
                                    <tr key={product.id} className="product-list-item">
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-list-image"
                                            />
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <DeleteProduct id={product.id} />
                                        </td>
                                        <td>
                                            <EditProduct product={product} />
                                        </td>
                                    </tr>
                                ))
                                : products.map((product) => (
                                    <tr key={product.id} className="product-list-item">
                                        <td>{product.title}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="product-list-image"
                                            />
                                        </td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <DeleteProduct id={product.id} />
                                        </td>
                                        <td>
                                            <EditProduct product={product} />
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductList;