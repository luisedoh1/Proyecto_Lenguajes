import React, { useState, useEffect } from 'react';
import './CategoryFilter.css';
import { fetchCategories } from '../Product/api';

const CategoryFilter = ({ onFilter, reset }) => {
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

    useEffect(() => {
        setSelectedCategory('');
        onFilter('');
    }, [reset, onFilter]);

    const handleChange = (e) => {
        const categoryId = parseInt(e.target.value, 10);
        setSelectedCategory(categoryId);
        onFilter(categoryId);
    };

    return (
        <div className="category-filter">
            <h2>Filter by Category</h2>
            <select value={selectedCategory} onChange={handleChange}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category.idCategoria} value={category.idCategoria}>
                        {category.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
