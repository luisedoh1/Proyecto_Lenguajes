import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        idRol: 3
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('https://localhost:7105/User', formData);
            console.log('Registration successful:', response.data);
            alert('Registration successful!');
            navigate("/login");
        } catch (error) {
            console.error('Error registering:', error);
            setError('Error registering. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-form-container">
            <h2 className="signup-header">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Username</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="contraseña">Password</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="submitButton" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default SignUp;
