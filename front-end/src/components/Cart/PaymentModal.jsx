import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentModal.css';
import CryptoJS from 'crypto-js';

const PaymentModal = ({ onClose, onPayment }) => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newPayment, setNewPayment] = useState({
        cardNumber: '',
        cvv: '',
        expiryMonth: '',
        expiryYear: '',
        cardType: ''
    });
    const [newAddress, setNewAddress] = useState({
        direccion: '',
        ciudad: '',
        pais: '',
        codigoPostal: ''
    });
    const [errors, setErrors] = useState({});
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');

    const userId = localStorage.getItem("idUsuario");

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/Payment/${userId}`);
                setPaymentMethods(response.data);
            } catch (error) {
                console.error('Error fetching payment methods:', error);
            }
        };

        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/Address/${userId}`);
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchPaymentMethods();
        fetchAddresses();
    }, [userId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cardNumber') {
            setNewPayment({ ...newPayment, [name]: formatCardNumber(value) });
        } else {
            setNewPayment({ ...newPayment, [name]: value });
        }
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const formatCardNumber = (value) => {
        return value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
    };

    const validateCardNumber = (cardNumber) => {
        const cardNumberRegex = /^(\d{4} ?){4}$/;
        return cardNumberRegex.test(cardNumber);
    };

    const validateCVV = (cvv) => {
        const cvvRegex = /^\d{3}$/;
        return cvvRegex.test(cvv);
    };

    const handleAddPaymentMethod = async () => {
        const newErrors = {};
        if (!validateCardNumber(newPayment.cardNumber)) {
            newErrors.cardNumber = 'Invalid card number. Format: 1234 5678 1234 5678';
        }
        if (!validateCVV(newPayment.cvv)) {
            newErrors.cvv = 'Invalid CVV. Must be 3 digits.';
        }
        if (!newPayment.expiryMonth) {
            newErrors.expiryMonth = 'Expiry month is required.';
        }
        if (!newPayment.expiryYear) {
            newErrors.expiryYear = 'Expiry year is required.';
        }
        if (!newPayment.cardType) {
            newErrors.cardType = 'Card type is required.';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const token = `${newPayment.cardNumber}|${newPayment.cvv}|${newPayment.expiryMonth}|${newPayment.expiryYear}`;
            const encryptedToken = CryptoJS.AES.encrypt(token, 'secret key 123').toString();

            const newMethod = {
                idUsuario: userId,
                idTipo: parseInt(newPayment.cardType, 10),
                token: encryptedToken
            };
            await axios.post('https://luisedoh1-001-site1.etempurl.com/Payment', newMethod);
            setPaymentMethods([...paymentMethods, newMethod]);
            setNewPayment({
                cardNumber: '',
                cvv: '',
                expiryMonth: '',
                expiryYear: '',
                cardType: ''
            });
            setShowAddPaymentForm(false);
        } catch (error) {
            console.error('Error adding new payment method:', error);
        }
    };

    const handleAddAddress = async () => {
        const newErrors = {};
        if (!newAddress.direccion) {
            newErrors.direccion = 'Address is required.';
        }
        if (!newAddress.ciudad) {
            newErrors.ciudad = 'City is required.';
        }
        if (!newAddress.pais) {
            newErrors.pais = 'Country is required.';
        }
        if (!newAddress.codigoPostal) {
            newErrors.codigoPostal = 'Postal code is required.';
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const newAddressData = {
                idUsuario: userId,
                ...newAddress
            };
            await axios.post('https://luisedoh1-001-site1.etempurl.com/Address', newAddressData);
            setAddresses([...addresses, newAddressData]);
            setNewAddress({
                direccion: '',
                ciudad: '',
                pais: '',
                codigoPostal: ''
            });
            setShowAddAddressForm(false);
        } catch (error) {
            console.error('Error adding new address:', error);
        }
    };

    const displayCardNumber = (token) => {
        const bytes = CryptoJS.AES.decrypt(token, 'secret key 123');
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        const [cardNumber] = decryptedData.split('|');
        const maskedCardNumber = cardNumber.slice(0, -4).replace(/./g, '*') + cardNumber.slice(-4);
        return maskedCardNumber;
    };

    return (
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal-content" onClick={e => e.stopPropagation()}>
                <button className="payment-close-button" onClick={onClose}>X</button>
                <div className="payment-modal-body">
                    <h2 className="payment-modal-title">Payment Methods</h2>
                    <select className="select-input" value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                        <option value="">Select a payment method</option>
                        {paymentMethods.map((method, index) => (
                            <option key={index} value={method.token}>
                                {displayCardNumber(method.token)} - Payment Method {index + 1}
                            </option>
                        ))}
                    </select>
                    <button
                        className="payment-add-button"
                        onClick={() => setShowAddPaymentForm(!showAddPaymentForm)}>
                        {showAddPaymentForm ? 'Cancel' : 'Add New Payment Method'}
                    </button>
                    {showAddPaymentForm && (
                        <div className="payment-form">
                            <input
                                type="text"
                                name="cardNumber"
                                value={newPayment.cardNumber}
                                onChange={handleInputChange}
                                placeholder="Card Number"
                                className="payment-input"
                                maxLength={19}
                            />
                            {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                            <input
                                type="text"
                                name="cvv"
                                value={newPayment.cvv}
                                onChange={handleInputChange}
                                placeholder="CVV"
                                className="payment-input"
                                maxLength={3}
                            />
                            {errors.cvv && <div className="error">{errors.cvv}</div>}
                            <select
                                name="expiryMonth"
                                value={newPayment.expiryMonth}
                                onChange={handleInputChange}
                                className="payment-input"
                            >
                                <option value="" disabled>Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {String(i + 1).padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                            {errors.expiryMonth && <div className="error">{errors.expiryMonth}</div>}
                            <select
                                name="expiryYear"
                                value={newPayment.expiryYear}
                                onChange={handleInputChange}
                                className="payment-input"
                            >
                                <option value="" disabled>Year</option>
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={new Date().getFullYear() + i}>
                                        {new Date().getFullYear() + i}
                                    </option>
                                ))}
                            </select>
                            {errors.expiryYear && <div className="error">{errors.expiryYear}</div>}
                            <select
                                name="cardType"
                                value={newPayment.cardType}
                                onChange={handleInputChange}
                                className="payment-input"
                            >
                                <option value="" disabled>Select card type</option>
                                <option value="1">Debit</option>
                                <option value="2">Credit</option>
                            </select>
                            {errors.cardType && <div className="error">{errors.cardType}</div>}
                            <button className="payment-save-button" onClick={handleAddPaymentMethod}>
                                Save Payment Method
                            </button>
                        </div>
                    )}
                    <h2 className="payment-modal-title">Addresses</h2>
                    <select className="select-input" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                        <option value="">Select an address</option>
                        {addresses.map((address, index) => (
                            <option key={index} value={address.id}>
                                {address.direccion}, {address.ciudad}, {address.pais}, {address.codigoPostal}
                            </option>
                        ))}
                    </select>
                    <button
                        className="payment-add-button"
                        onClick={() => setShowAddAddressForm(!showAddAddressForm)}>
                        {showAddAddressForm ? 'Cancel' : 'Add New Address'}
                    </button>
                    {showAddAddressForm && (
                        <div className="payment-form">
                            <input
                                type="text"
                                name="direccion"
                                value={newAddress.direccion}
                                onChange={handleAddressChange}
                                placeholder="Address"
                                className="payment-input"
                            />
                            {errors.direccion && <div className="error">{errors.direccion}</div>}
                            <input
                                type="text"
                                name="ciudad"
                                value={newAddress.ciudad}
                                onChange={handleAddressChange}
                                placeholder="City"
                                className="payment-input"
                            />
                            {errors.ciudad && <div className="error">{errors.ciudad}</div>}
                            <input
                                type="text"
                                name="pais"
                                value={newAddress.pais}
                                onChange={handleAddressChange}
                                placeholder="Country"
                                className="payment-input"
                            />
                            {errors.pais && <div className="error">{errors.pais}</div>}
                            <input
                                type="text"
                                name="codigoPostal"
                                value={newAddress.codigoPostal}
                                onChange={handleAddressChange}
                                placeholder="Postal Code"
                                className="payment-input"
                            />
                            {errors.codigoPostal && <div className="error">{errors.codigoPostal}</div>}
                            <button className="payment-save-button" onClick={handleAddAddress}>
                                Save Address
                            </button>
                        </div>
                    )}
                    <button className="order-button" onClick={() => onPayment(selectedPaymentMethod)} disabled={!selectedPaymentMethod || !selectedAddress}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
