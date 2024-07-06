import React, { useState, useEffect } from 'react';
import search from '../imgs/search.png';
import './SearchBar.css';

const SearchBar = ({ onSearch, title, value }) => {
    const [query, setQuery] = useState(value);

    useEffect(() => {
        setQuery(value);
    }, [value]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                value={value}
                onChange={(e) => onSearch(e.target.value)}
                placeholder={title}
            />
        </div>
    );
};

export default SearchBar;
