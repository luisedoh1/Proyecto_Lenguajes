import { useState, useEffect } from 'react';
import { fetchProducts } from '../Product/api';
import PriceRangeFilter from '../Filters/PriceRangeFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import FeatureFilter from '../Filters/FeatureFilter';
import { ProductModal } from './ProductModal';

export const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFeature1, setSelectedFeature1] = useState('');
    const [selectedFeature2, setSelectedFeature2] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts();
                setProducts(products);
                setAllProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [priceRange, selectedCategory, selectedFeature1, selectedFeature2]);

    const applyFilters = () => {
        let filteredProducts = allProducts;

        if (priceRange.min !== null && priceRange.max !== null) {
            filteredProducts = filteredProducts.filter(product =>
                product.precio >= priceRange.min && product.precio <= priceRange.max
            );
        }

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product =>
                product.categoriaId === selectedCategory
            );
        }

        if (selectedFeature1) {
            filteredProducts = filteredProducts.filter(product =>
                product.caracteristicaId1 === parseInt(selectedFeature1) || product.caracteristicaId2 === parseInt(selectedFeature1)
            );
        }

        if (selectedFeature2) {
            filteredProducts = filteredProducts.filter(product =>
                product.caracteristicaId1 === parseInt(selectedFeature2) || product.caracteristicaId2 === parseInt(selectedFeature2)
            );
        }

        setProducts(filteredProducts);
    };

    const filterByPrice = (minPrice, maxPrice) => {
        setPriceRange({ min: minPrice, max: maxPrice });
    };

    const filterByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const filterByFeature = (featureId1, featureId2) => {
        setSelectedFeature1(featureId1);
        setSelectedFeature2(featureId2);
    };

    const resetFilters = () => {
        setPriceRange({ min: 0, max: 1000 });
        setSelectedCategory('');
        setSelectedFeature1('');
        setSelectedFeature2('');
    };

    const openProductModal = (product) => {
        setSelectedProduct(product)
    }
    const closeProductModal = () =>{
        setSelectedProduct(null)
    }

    return (
        <div className="products-page">
            <div className="filters-container">
                <PriceRangeFilter onFilter={filterByPrice} />
                <CategoryFilter onFilter={filterByCategory} />
                <FeatureFilter onFilter={filterByFeature} />
                <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
            </div>
            <div className="catalog-container">
                <h1 className="catalog-title">Product Catalog</h1>
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
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.idProducto} className="product-card" onClick={() => openProductModal(product)}>
                            <img src={product.imagen} alt={product.nombre} className="product-image" />
                            <h3 className="product-name">{product.nombre}</h3>
                            <p className="product-price">${product.precio}</p>
                        </div>
                    ))}
                </div>
            </div> 
            
        </div>
    );
};
