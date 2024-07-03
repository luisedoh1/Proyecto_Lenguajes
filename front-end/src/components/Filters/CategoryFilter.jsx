import React, { useState, useEffect } from 'react';
import './CategoryFilter.css';
import { fetchCategories } from '../Product/api';

const CategoryFilter = ({ onFilter }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error('Failed to fetch categories:', error);
                setCategories([]);
            }
        };

        getCategories();
    }, []);

    const handleFilter = () => {
        onFilter(parseInt(selectedCategory, 10));
    };

    return (
        <div className="category-filter">
            <h2>Filter by Category</h2>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.idCategoria} value={category.idCategoria}>
                        {category.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default CategoryFilter;
