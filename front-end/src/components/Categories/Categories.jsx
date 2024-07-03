import { useEffect, useState } from "react";
import { fetchProducts } from "../Product/api";
import DeleteCategories  from "./DeleteCategories";
import EditCategories from "./EditCategories";
import AddCategories from "./AddCategories";
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
                    const categories = products.map(product => product.categoria);
                    const uniqueCategories = [...new Set(categories.map(cat => cat.nombre))].map(name => {
                        return categories.find(cat => cat.nombre === name);
                    });
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
        <div className="category-list-container">
            <h1 className="category-list-title">Categories List</h1>
            <AddCategories />
            {loading && (
                <div className="modal-container">
                    <div className="modal">
                        <div className="spinner"></div>
                        <h2>Loading Categories...</h2>
                        <p>Please wait while we load the categories for you.</p>
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
                <div className="category-list-scroll">
                    <table className="category-list-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Delete</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index} className="category-list-item">
                                    <td>{category.nombre}</td>
                                    <td>
                                        <DeleteCategories id={category.idCategoria} />
                                    </td>
                                    <td>
                                        <EditCategories category={category} />
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

