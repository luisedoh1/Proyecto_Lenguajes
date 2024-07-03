import React from 'react';
import './SortFilter.css';

const SortFilter = ({ onSort }) => {
    const handleSortChange = (e) => {
        const [orderBy, orderType] = e.target.value.split('|');
        onSort(orderBy, orderType);
    };

    return (
        <div className="sort-filter">
            <h2>Sort Products</h2>
            <select onChange={handleSortChange}>
                <option value="">Select sorting option</option>
                <option value="precio|asc">Price: Low to High</option>
                <option value="precio|desc">Price: High to Low</option>
                <option value="fechaAñadido|desc">Most Recent</option>
                <option value="popularidad|desc">Most Popular</option>
            </select>
        </div>
    );
};

export default SortFilter;