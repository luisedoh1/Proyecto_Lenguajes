import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from './CustomModal';
import './UserProfile.css';

const UserInfo = ({ onUpdate }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/user/${userId}`);
                setUserDetails(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            contraseña: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            contraseña: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/user/idUsuario/${userId}`, values);
                setUserDetails(response.data);
                resetForm();
                setIsModalOpen(false);
                onUpdate();
            } catch (err) {
                setError(err.message);
            }
        }
    });

    useEffect(() => {
        if (userDetails) {
            formik.setValues({
                nombre: userDetails.nombre,
                email: userDetails.email,
                contraseña: '',
            });
        }
    }, [userDetails]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-profile-container">
            <button onClick={() => setIsModalOpen(true)}>Edit User Details</button>
            <table className="user-profile-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {userDetails ? (
                        <tr>
                            <td>{userDetails.nombre}</td>
                            <td>{userDetails.email}</td>
                            <td>********</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="3">User details not available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>Edit User Details</h2>
                <form onSubmit={formik.handleSubmit} className="modal-form">
                    <input
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Name"
                    />
                    {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="error">{formik.errors.nombre}</div>
                    ) : null}
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                    <input
                        type="password"
                        name="contraseña"
                        value={formik.values.contraseña}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                    />
                    {formik.touched.contraseña && formik.errors.contraseña ? (
                        <div className="error">{formik.errors.contraseña}</div>
                    ) : null}
                    <button type="submit">Save Changes</button>
                </form>
            </CustomModal>
        </div>
    );
};

export default UserInfo;
