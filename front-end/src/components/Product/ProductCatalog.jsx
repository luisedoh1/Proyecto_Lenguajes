import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../Product/api';
import PriceRangeFilter from '../Filters/PriceRangeFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import FeatureFilter from '../Filters/FeatureFilter';
import SortFilter from '../Filters/SortFilter';
import { ProductModal } from './ProductModal';

export const ProductCatalog = () => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedFeature1, setSelectedFeature1] = useState('');
    const [selectedFeature2, setSelectedFeature2] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [orderBy, setOrderBy] = useState('');
    const [orderType, setOrderType] = useState('');
    const [reset, setReset] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const products = await fetchProducts(orderBy, orderType);
                setProducts(products);
                setOriginalProducts(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, [orderBy, orderType]);

    useEffect(() => {
        applyFilters();
    }, [priceRange, selectedCategory, selectedFeature1, selectedFeature2]);

    const applyFilters = () => {
        let filteredProducts = [...originalProducts];

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

    const filterByPrice = useCallback((minPrice, maxPrice) => {
        setPriceRange({ min: minPrice, max: maxPrice });
    }, []);

    const filterByCategory = useCallback((categoryId) => {
        setSelectedCategory(categoryId);
    }, []);

    const filterByFeature = useCallback((featureId1, featureId2) => {
        if (featureId1 !== null) {
            setSelectedFeature1(featureId1);
        }
        if (featureId2 !== null) {
            setSelectedFeature2(featureId2);
        }
    }, []);

    const handleSort = useCallback((orderBy, orderType) => {
        setOrderBy(orderBy);
        setOrderType(orderType);
    }, []);

    const resetFilters = () => {
        setPriceRange({ min: 0, max: 1000 });
        setSelectedCategory('');
        setSelectedFeature1('');
        setSelectedFeature2('');
        setOrderBy('');
        setOrderType('');
        setProducts(originalProducts);
        setReset(prev => !prev); // Cambiar el estado de reset para desencadenar los efectos en los filtros
    };

    const openProductModal = (product) => {
        setSelectedProduct(product);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="products-page">
            <div className="filters-container">
                <PriceRangeFilter onFilter={filterByPrice} reset={reset} />
                <CategoryFilter onFilter={filterByCategory} reset={reset} />
                <FeatureFilter onFilter={filterByFeature} reset={reset} />
                <SortFilter onSort={handleSort} reset={reset} />
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
            {selectedProduct && <ProductModal id={selectedProduct.idProducto} name={selectedProduct.nombre} price={selectedProduct.precio} image={selectedProduct.imagen} description={selectedProduct.descripcion} categorie={selectedProduct.categoriaId} onClose={closeProductModal} />}
        </div>
    );
};
