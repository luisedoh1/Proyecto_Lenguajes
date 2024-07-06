import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user info
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://luisedoh1-001-site1.etempurl.com/user');
                setUserInfo(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put('https://luisedoh1-001-site1.etempurl.com/user', userInfo);
            alert('User info updated successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-info">
            <h2>Personal Information</h2>
            <input
                type="text"
                name="nombre"
                value={userInfo.nombre || ''}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <input
                type="email"
                name="email"
                value={userInfo.email || ''}
                onChange={handleInputChange}
                placeholder="Email"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default UserInfo;