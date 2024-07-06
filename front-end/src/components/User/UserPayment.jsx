import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomModal from './CustomModal';
import './UserProfile.css';

const UserPayment = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userId = localStorage.getItem('idUsuario');

    useEffect(() => {
        const fetchUserPaymentMethods = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/payment/${userId}`);
                setPaymentMethods(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPaymentMethods();
    }, [userId]);

    const formik = useFormik({
        initialValues: {
            idTipo: '',
            token: ''
        },
        validationSchema: Yup.object({
            idTipo: Yup.string().required('Payment type is required'),
            token: Yup.string().required('Token is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/payment', {
                    ...values,
                    idUsuario: userId
                });
                setPaymentMethods([...paymentMethods, response.data]);
                resetForm();
                setIsModalOpen(false);
            } catch (err) {
                setError(err.message);
            }
        }
    });

    const handleDeletePaymentMethod = async (id) => {
        try {
            await axios.delete(`https://luisedoh1-001-site1.etempurl.com/payment/${id}`);
            setPaymentMethods(paymentMethods.filter(payment => payment.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdatePaymentMethod = async (id, updatedPayment) => {
        try {
            const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/payment/${id}`, {
                ...updatedPayment,
                idUsuario: userId
            });
            setPaymentMethods(paymentMethods.map(payment => (payment.id === id ? response.data : payment)));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-profile-container">
            <button onClick={() => setIsModalOpen(true)}>Add Payment Method</button>
            <table className="user-profile-table">
                <thead>
                    <tr>
                        <th>Payment Type</th>
                        <th>Token</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentMethods.length > 0 ? (
                        paymentMethods.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.idTipo}</td>
                                <td>{payment.token}</td>
                                <td>
                                    <button onClick={() => handleDeletePaymentMethod(payment.id)}>Delete</button>
                                    <button onClick={() => handleUpdatePaymentMethod(payment.id, {
                                        idTipo: prompt('New Payment Type:', payment.idTipo) || payment.idTipo,
                                        token: prompt('New Token:', payment.token) || payment.token
                                    })}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No payment methods associated with this user.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>Add New Payment Method</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="idTipo"
                        value={formik.values.idTipo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Payment Type"
                    />
                    {formik.touched.idTipo && formik.errors.idTipo ? (
                        <div className="error">{formik.errors.idTipo}</div>
                    ) : null}
                    <input
                        type="text"
                        name="token"
                        value={formik.values.token}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Token"
                    />
                    {formik.touched.token && formik.errors.token ? (
                        <div className="error">{formik.errors.token}</div>
                    ) : null}
                    <button type="submit">Add Payment Method</button>
                </form>
            </CustomModal>
        </div>
    );
};

export default UserPayment;
