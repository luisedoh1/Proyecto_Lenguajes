import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        direccion: '',
        ciudad: '',
        pais: '',
        codigoPostal: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchUserAddresses = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/address/${userId}`);
                setAddresses(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserAddresses();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleAddAddress = async () => {
        try {
            const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/address', {
                ...newAddress,
                idUsuario: userId
            });
            setAddresses([...addresses, response.data]);
            setNewAddress({
                direccion: '',
                ciudad: '',
                pais: '',
                codigoPostal: ''
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAddress = async (id) => {
        try {
            await axios.delete(`https://luisedoh1-001-site1.etempurl.com/address/${id}`);
            setAddresses(addresses.filter(address => address.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateAddress = async (id, updatedAddress) => {
        try {
            const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/address/${id}`, {
                ...updatedAddress,
                idUsuario: userId
            });
            setAddresses(addresses.map(address => (address.id === id ? response.data : address)));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-addresses">
            <h2>Addresses</h2>
            <input
                type="text"
                name="direccion"
                value={newAddress.direccion}
                onChange={handleInputChange}
                placeholder="Address"
            />
            <input
                type="text"
                name="ciudad"
                value={newAddress.ciudad}
                onChange={handleInputChange}
                placeholder="City"
            />
            <input
                type="text"
                name="pais"
                value={newAddress.pais}
                onChange={handleInputChange}
                placeholder="Country"
            />
            <input
                type="text"
                name="codigoPostal"
                value={newAddress.codigoPostal}
                onChange={handleInputChange}
                placeholder="Postal Code"
            />
            <button onClick={handleAddAddress}>Add Address</button>
            <ul>
                {addresses.map(address => (
                    <li key={address.id}>
                        <p>{address.direccion}, {address.ciudad}, {address.pais}, {address.codigoPostal}</p>
                        <button onClick={() => handleDeleteAddress(address.id)}>Delete</button>
                        <button onClick={() => handleUpdateAddress(address.id, {
                            direccion: prompt('New Address:', address.direccion) || address.direccion,
                            ciudad: prompt('New City:', address.ciudad) || address.ciudad,
                            pais: prompt('New Country:', address.pais) || address.pais,
                            codigoPostal: prompt('New Postal Code:', address.codigoPostal) || address.codigoPostal
                        })}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAddress;
