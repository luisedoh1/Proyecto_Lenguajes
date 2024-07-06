import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from './CustomModal';
import './UserProfile.css';

const UserAddress = ({ onUpdate }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
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

    const formik = useFormik({
        initialValues: {
            direccion: '',
            ciudad: '',
            pais: '',
            codigoPostal: ''
        },
        validationSchema: Yup.object({
            direccion: Yup.string().required('Address is required'),
            ciudad: Yup.string().required('City is required'),
            pais: Yup.string().required('Country is required'),
            codigoPostal: Yup.string().required('Postal Code is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            const payload = {
                ...values,
                idUsuario: userId,
                idDireccion: isEditMode ? currentAddress.idDireccion : 0
            };

            if (isEditMode) {
                try {
                    const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/address/${currentAddress.idDireccion}`, payload);
                    setAddresses(addresses.map(address => (address.idDireccion === currentAddress.idDireccion ? response.data : address)));
                    resetForm();
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setCurrentAddress(null);
                    onUpdate();
                } catch (err) {
                    setError(err.message);
                    console.error('Error updating address:', err.response || err.message);
                }
            } else {
                try {
                    const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/address', payload);
                    setAddresses([...addresses, response.data]);
                    resetForm();
                    setIsModalOpen(false);
                } catch (err) {
                    setError(err.message);
                    console.error('Error adding address:', err.response || err.message);
                }
            }
        }
    });

    const handleEditAddress = (address) => {
        setCurrentAddress(address);
        formik.setValues({
            direccion: address.direccion,
            ciudad: address.ciudad,
            pais: address.pais,
            codigoPostal: address.codigoPostal
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteAddress = async (idDireccion) => {
        try {
            await axios.delete(`https://luisedoh1-001-site1.etempurl.com/address/${idDireccion}`);
            setAddresses(addresses.filter(address => address.idDireccion !== idDireccion));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-profile-container">
            <button onClick={() => {
                setIsEditMode(false);
                setIsModalOpen(true);
            }}>Add Address</button>
            <table className="user-profile-table">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Postal Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.length > 0 ? (
                        addresses.map(address => (
                            <tr key={address.idDireccion}>
                                <td>{address.direccion}</td>
                                <td>{address.ciudad}</td>
                                <td>{address.pais}</td>
                                <td>{address.codigoPostal}</td>
                                <td>
                                    <button onClick={() => handleEditAddress(address)}>Edit</button>
                                    <button onClick={() => handleDeleteAddress(address.idDireccion)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No addresses associated with this user.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>{isEditMode ? 'Edit Address' : 'Add New Address'}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="direccion"
                        value={formik.values.direccion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Address"
                    />
                    {formik.touched.direccion && formik.errors.direccion ? (
                        <div className="error">{formik.errors.direccion}</div>
                    ) : null}
                    <input
                        type="text"
                        name="ciudad"
                        value={formik.values.ciudad}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="City"
                    />
                    {formik.touched.ciudad && formik.errors.ciudad ? (
                        <div className="error">{formik.errors.ciudad}</div>
                    ) : null}
                    <input
                        type="text"
                        name="pais"
                        value={formik.values.pais}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Country"
                    />
                    {formik.touched.pais && formik.errors.pais ? (
                        <div className="error">{formik.errors.pais}</div>
                    ) : null}
                    <input
                        type="text"
                        name="codigoPostal"
                        value={formik.values.codigoPostal}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Postal Code"
                    />
                    {formik.touched.codigoPostal && formik.errors.codigoPostal ? (
                        <div className="error">{formik.errors.codigoPostal}</div>
                    ) : null}
                    <button type="submit">{isEditMode ? 'Update Address' : 'Add Address'}</button>
                </form>
            </CustomModal>
        </div>
    );
};

export default UserAddress;
