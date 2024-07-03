import React, { useState, useEffect } from 'react';
import './FeatureFilter.css'; // Asegúrate de importar el CSS
import { fetchCharacteristics } from '../Product/api';

const FeatureFilter = ({ onFilter }) => {
    const [characteristics, setCharacteristics] = useState([]);
    const [selectedFeature1, setSelectedFeature1] = useState('');
    const [selectedFeature2, setSelectedFeature2] = useState('');

    useEffect(() => {
        const getCharacteristics = async () => {
            try {
                const data = await fetchCharacteristics();
                setCharacteristics(data);
            } catch (error) {
                console.error('Failed to fetch characteristics:', error);
                setCharacteristics([]);
            }
        };

        getCharacteristics();
    }, []);

    const handleFilter = () => {
        onFilter(selectedFeature1, selectedFeature2);
    };

    return (
        <div className="feature-filter">
            <h2>Filter by Feature</h2>
            <select value={selectedFeature1} onChange={(e) => setSelectedFeature1(e.target.value)}>
                <option value="">Select first feature</option>
                {characteristics.map((feature) => (
                    <option key={feature.idCaracteristica} value={feature.idCaracteristica}>
                        {feature.nombre}
                    </option>
                ))}
            </select>
            <select value={selectedFeature2} onChange={(e) => setSelectedFeature2(e.target.value)}>
                <option value="">Select second feature</option>
                {characteristics.map((feature) => (
                    <option key={feature.idCaracteristica} value={feature.idCaracteristica}>
                        {feature.nombre}
                    </option>
                ))}
            </select>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default FeatureFilter;