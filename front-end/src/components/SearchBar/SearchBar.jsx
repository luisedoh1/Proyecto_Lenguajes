import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, title }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-bar__input"
                value={query}
                onChange={handleInputChange}
                placeholder={title}
            />
            <button className="search-bar__button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
