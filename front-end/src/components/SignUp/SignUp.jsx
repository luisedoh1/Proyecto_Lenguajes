import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            contraseña: '',
            idRol: 3
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, 'Username must be at least 3 characters long')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            contraseña: Yup.string()
                .min(6, 'Password must be at least 6 characters long')
                .required('Required')
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/User', values);
                console.log('Registration successful:', response.data);
                alert('Registration successful!');
                navigate("/login");
            } catch (error) {
                console.error('Error registering:', error);
                setErrors({ api: 'Error registering. Please try again.' });
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="signup-form-container">
            <h2 className="signup-header">Sign Up</h2>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="nombre">Username</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                    <div className="error-message">{formik.errors.nombre}</div>
                ) : null}

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error-message">{formik.errors.email}</div>
                ) : null}

                <label htmlFor="contraseña">Password</label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.contraseña}
                />
                {formik.touched.contraseña && formik.errors.contraseña ? (
                    <div className="error-message">{formik.errors.contraseña}</div>
                ) : null}

                <button type="submit" className="submitButton" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
                {formik.errors.api && <p className="error-message">{formik.errors.api}</p>}
            </form>
        </div>
    );
};

export default SignUp;
