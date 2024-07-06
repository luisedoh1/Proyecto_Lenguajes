import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CryptoJS from 'crypto-js';
import CustomModal from './CustomModal';
import './UserProfile.css';

const UserPayment = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentPayment, setCurrentPayment] = useState(null);
    const userId = localStorage.getItem('idUsuario');
    const secretKey = 'secret key 123'; 

    useEffect(() => {
        const fetchUserPayments = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/payment/${userId}`);
                setPayments(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPayments();
    }, [userId]);

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    const validateCardNumber = (cardNumber) => {
        const cardNumberRegex = /^(\d{4} ?){4}$/;
        return cardNumberRegex.test(cardNumber);
    };

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
            idTipo: '1'
        },
        validationSchema: Yup.object({
            cardNumber: Yup.string()
                .required('Card number is required')
                .test('isValidCardNumber', 'Invalid card number format', validateCardNumber),
            expiryMonth: Yup.string().required('Expiry month is required'),
            expiryYear: Yup.string().required('Expiry year is required'),
            cvv: Yup.string().required('CVV is required').max(3, 'CVV cannot exceed 3 characters'),
            idTipo: Yup.string().oneOf(['1', '2'], 'Invalid card type').required('Card type is required')
        }),
        onSubmit: async (values, { resetForm }) => {
            const cardDetails = `${values.cardNumber.replace(/ /g, '')}|${values.expiryMonth}/${values.expiryYear}|${values.cvv}`;
            const encryptedToken = CryptoJS.AES.encrypt(cardDetails, secretKey).toString();

            const payload = {
                idMetodo: isEditMode ? currentPayment.idMetodo : 0,
                idUsuario: userId,
                idTipo: values.idTipo,
                token: encryptedToken,
            };

            if (isEditMode) {
                try {
                    const response = await axios.put(`https://luisedoh1-001-site1.etempurl.com/payment/${currentPayment.idMetodo}`, payload);
                    setPayments(payments.map(payment => (payment.idMetodo === currentPayment.idMetodo ? response.data : payment)));
                    resetForm();
                    setIsModalOpen(false);
                    setIsEditMode(false);
                    setCurrentPayment(null);
                } catch (err) {
                    setError(err.message);
                    console.error('Error updating payment:', err.response || err.message);
                }
            } else {
                try {
                    const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/payment', payload);
                    setPayments([...payments, response.data]);
                    resetForm();
                    setIsModalOpen(false);
                } catch (err) {
                    setError(err.message);
                    console.error('Error adding payment:', err.response || err.message);
                }
            }
        }
    });

    const handleEditPayment = (payment) => {
        const decryptedToken = CryptoJS.AES.decrypt(payment.token, secretKey).toString(CryptoJS.enc.Utf8);
        const [cardNumber, expiryDate, cvv] = decryptedToken.split('|');
        const [expiryMonth, expiryYear] = expiryDate.split('/');
        
        setCurrentPayment(payment);
        formik.setValues({
            cardNumber: formatCardNumber(cardNumber),
            expiryMonth,
            expiryYear,
            cvv,
            idTipo: payment.idTipo.toString()
        });
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeletePayment = async (idMetodo) => {
        try {
            await axios.delete(`https://luisedoh1-001-site1.etempurl.com/payment/${idMetodo}`);
            setPayments(payments.filter(payment => payment.idMetodo !== idMetodo));
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
            }}>Add Payment Method</button>
            <table className="user-profile-table">
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Expiry Date</th>
                        <th>Card Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ? (
                        payments.map(payment => (
                            <tr key={payment.idMetodo}>
                                <td>**** **** **** {CryptoJS.AES.decrypt(payment.token, secretKey).toString(CryptoJS.enc.Utf8).split('|')[0].slice(-4)}</td>
                                <td>{CryptoJS.AES.decrypt(payment.token, secretKey).toString(CryptoJS.enc.Utf8).split('|')[1]}</td>
                                <td>{payment.idTipo === 1 ? 'Debit' : 'Credit'}</td>
                                <td>
                                    <button onClick={() => handleEditPayment(payment)}>Edit</button>
                                    <button onClick={() => handleDeletePayment(payment.idMetodo)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No payment methods associated with this user.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <CustomModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>{isEditMode ? 'Edit Payment Method' : 'Add New Payment Method'}</h2>
                <form onSubmit={formik.handleSubmit} className="payment-form">
                    <input
                        type="text"
                        name="cardNumber"
                        value={formik.values.cardNumber}
                        onChange={(e) => {
                            formik.setFieldValue('cardNumber', formatCardNumber(e.target.value));
                        }}
                        onBlur={formik.handleBlur}
                        placeholder="Card Number"
                        className="payment-input"
                        maxLength={19}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber ? (
                        <div className="error">{formik.errors.cardNumber}</div>
                    ) : null}
                    <input
                        type="text"
                        name="cvv"
                        value={formik.values.cvv}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="CVV"
                        className="payment-input"
                        maxLength={3}
                    />
                    {formik.touched.cvv && formik.errors.cvv ? (
                        <div className="error">{formik.errors.cvv}</div>
                    ) : null}
                    <select
                        name="expiryMonth"
                        value={formik.values.expiryMonth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="payment-input"
                    >
                        <option value="" disabled>Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {String(i + 1).padStart(2, '0')}
                            </option>
                        ))}
                    </select>
                    {formik.touched.expiryMonth && formik.errors.expiryMonth ? (
                        <div className="error">{formik.errors.expiryMonth}</div>
                    ) : null}
                    <select
                        name="expiryYear"
                        value={formik.values.expiryYear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="payment-input"
                    >
                        <option value="" disabled>Year</option>
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i} value={new Date().getFullYear() + i}>
                                {new Date().getFullYear() + i}
                            </option>
                        ))}
                    </select>
                    {formik.touched.expiryYear && formik.errors.expiryYear ? (
                        <div className="error">{formik.errors.expiryYear}</div>
                    ) : null}
                    <select
                        name="idTipo"
                        value={formik.values.idTipo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="user-profile-select"
                    >
                        <option value="1">Debit</option>
                        <option value="2">Credit</option>
                    </select>
                    {formik.touched.idTipo && formik.errors.idTipo ? (
                        <div className="error">{formik.errors.idTipo}</div>
                    ) : null}
                    <button type="submit" className="payment-save-button">{isEditMode ? 'Update Payment Method' : 'Add Payment Method'}</button>
                </form>
            </CustomModal>
        </div>
    );
};

export default UserPayment;
