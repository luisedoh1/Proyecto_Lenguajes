import React, { useState, useEffect } from 'react';
import './FeatureFilter.css'; 
import { fetchCharacteristics } from '../Product/api';

const FeatureFilter = ({ onFilter, reset }) => {
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

    useEffect(() => {
        setSelectedFeature1('');
        setSelectedFeature2('');
        onFilter('', '');
    }, [reset, onFilter]);

    const handleChange1 = (e) => {
        const featureId = e.target.value;
        setSelectedFeature1(featureId);
        onFilter(featureId, selectedFeature2);
    };

    const handleChange2 = (e) => {
        const featureId = e.target.value;
        setSelectedFeature2(featureId);
        onFilter(selectedFeature1, featureId);
    };

    return (
        <div className="feature-filter">
            <h2>Filter by Feature</h2>
            <select value={selectedFeature1} onChange={handleChange1}>
                <option value="">Select first feature</option>
                {characteristics.map((feature) => (
                    <option key={feature.idCaracteristica} value={feature.idCaracteristica}>
                        {feature.nombre}
                    </option>
                ))}
            </select>
            <select value={selectedFeature2} onChange={handleChange2}>
                <option value="">Select second feature</option>
                {characteristics.map((feature) => (
                    <option key={feature.idCaracteristica} value={feature.idCaracteristica}>
                        {feature.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FeatureFilter;
