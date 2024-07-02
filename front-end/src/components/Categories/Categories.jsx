import { useEffect, useState } from "react";
import { fetchProducts } from "../Product/api";
import { DeleteProduct } from "../Product/DeleteProduct";
import EditProduct from "../Product/EditProduct";
import "./Categories.css";

const Categories = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
            } catch (error) {
                setError(error.message);
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const getCategories = async () => {
                try {
                    const categories = products.map(product => product.category);
                    const uniqueCategories = [...new Set(categories)];
                    setCategories(uniqueCategories);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            getCategories();
        }
    }, [products]);

    return (
        <div className="product-list-container">
            <h1 className="product-list-title">Categorie List</h1>
            {loading && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="spinner"></div>
                        <h2>Loading Categories...</h2>
                        <p>Please wait while we load the products for you.</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="modal-container">
                    <div className="modal">
                        <h2>Error Loading Categories</h2>
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
                                <th>Category</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
<<<<<<< Updated upstream
                                <tr key={index} className="product-list-item">
                                    <td>{category}</td>
                                    <td>
                                        <DeleteProduct id={category.id} />
                                    </td>
                                    <td>
                                        <EditProduct product={category} />
=======
                                <tr key={index} className="category-list-item">
                                    <td>{category.nombre}</td>
                                    <td>
                                        <DeleteCategory id={category.idCategoria} />
                                    </td>
                                    <td>
                                        <EditCategories category={category.idCategoria} />
>>>>>>> Stashed changes
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

export default Categories;
