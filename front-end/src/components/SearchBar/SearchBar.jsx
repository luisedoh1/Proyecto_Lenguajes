/* eslint-disable react/prop-types */
import { useState } from 'react';
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
                placeholder={title}
                value={query}
                onChange={handleInputChange}
                className="search-bar__input"
            />
            <button onClick={handleSearch} className="search-bar__button">Search</button>
        </div>
    );
};

export default SearchBar;