import { useEffect, useState } from "react";
import { fetchProducts, fetchCategories } from "./api";
import { DeleteProduct } from "./DeleteProduct";
import SearchBar from "../SearchBar/SearchBar";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
import "./ProductList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProductsAndCategories = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    fetchProducts(),
                    fetchCategories(),
                ]);
                const productsWithCategoryNames = productsData.map(product => {
                    const category = categoriesData.find(cat => cat.idCategoria === product.categoriaId);
                    return {
                        ...product,
                        categoriaNombre: category ? category.nombre : 'Unknown',
                    };
                });
                setProducts(productsWithCategoryNames);
                setFilteredProducts(productsWithCategoryNames);
                setCategories(categoriesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProductsAndCategories();
    }, []);

    const handleSearchName = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        setFilteredProducts(
            products.filter(
                (product) =>
                    product.nombre.toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    const handleSearchId = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        setFilteredProducts(
            products.filter((product) => 
                product.codigo.toLowerCase().includes(lowerCaseQuery)
            )
        );
    };

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Product List</h1>
            <SearchBar onSearch={handleSearchName} title={"Buscar por nombre"} />
            <SearchBar onSearch={handleSearchId} title={"Buscar por codigo"} />
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
                                <th>Code</th>
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
                                    <tr key={product.idProducto} className="product-list-item">
                                        <td>{product.codigo}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.descripcion}</td>
                                        <td>
                                            <img
                                                src={product.imagen}
                                                alt={product.title}
                                                className="product-list-image"
                                            />
                                        </td>
                                        <td>${product.precio}</td>
                                        <td>{product.categoriaNombre}</td>
                                        <td>
                                            <DeleteProduct id={product.idProducto} />
                                        </td>
                                        <td>
                                            <EditProduct product={product} />
                                        </td>
                                    </tr>
                                ))
                                : products.map((product) => (
                                    <tr key={product.idProducto} className="product-list-item">
                                        <td>{product.codigo}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.descripcion}</td>
                                        <td>
                                            <img
                                                src={product.imagen}
                                                alt={product.title}
                                                className="product-list-image"
                                            />
                                        </td>
                                        <td>${product.precio}</td>
                                        <td>{product.categoriaNombre}</td>
                                        <td>
                                            <DeleteProduct id={product.idProducto} />
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