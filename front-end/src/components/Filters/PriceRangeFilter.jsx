import React, { useState, useEffect } from 'react';
import './PriceRangeFilter.css';

const PriceRangeFilter = ({ onFilter, reset }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const [currentMin, setCurrentMin] = useState(0);
    const [currentMax, setCurrentMax] = useState(1000);

    useEffect(() => {
        setCurrentMin(minPrice);
        setCurrentMax(maxPrice);
        onFilter(minPrice, maxPrice);
    }, [reset, minPrice, maxPrice, onFilter]);

    const handleChangeMin = (e) => {
        const value = Number(e.target.value);
        setCurrentMin(value);
        onFilter(value, currentMax);
    };

    const handleChangeMax = (e) => {
        const value = Number(e.target.value);
        setCurrentMax(value);
        onFilter(currentMin, value);
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
                        onChange={handleChangeMin}
                    />
                </div>
                <div>
                    <label>Max: ${currentMax}</label>
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={currentMax}
                        onChange={handleChangeMax}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceRangeFilter;
