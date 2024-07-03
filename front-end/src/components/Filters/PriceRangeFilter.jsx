import React, { useState } from 'react';
import './PriceRangeFilter.css';

const PriceRangeFilter = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [currentMin, setCurrentMin] = useState(0);
    const [currentMax, setCurrentMax] = useState(1000);

    const handleFilter = () => {
        onFilter(Number(currentMin), Number(currentMax));
    };

    return (
        <div className="price-range-filter">
            <h2>Filter by Price Range</h2>
            <div className="range-inputs">
                <div>
                    <label>Min: ${currentMin}</label>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={currentMin}
                        onChange={(e) => setCurrentMin(e.target.value)}
                    />
                </div>
                <div>
                    <label>Max: ${currentMax}</label>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={currentMax}
                        onChange={(e) => setCurrentMax(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};



export default PriceRangeFilter;
