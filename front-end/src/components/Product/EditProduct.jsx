/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { fetchCategories, fetchCharacteristics } from "../Product/api";
import axios from "axios";
import edit from '../imgs/editar.gif'
import './EditProduct.css';

const EditProduct = ({ product }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState(product);
    const [categories, setCategories] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleEdit = async () => {
        setLoading(true);
        try {
            const response = await axios.put(`https://localhost:7105/products/${product.idProducto}`, productData);
            if (response.status !== 204) {
                throw new Error('Error editing the product');
            }
            alert('Producto editado');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await fetchCategories();
                setCategories(categories);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getCategories();
    }, []);

    useEffect(() => {
        const getCharacteristics = async () => {
            try {
                const characteristics = await fetchCharacteristics();
                setCharacteristics(characteristics);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getCharacteristics();
    }, []);

    return (
        <div className="edit-product-container">
            <button className="edit-button" onClick={() => setShowModal(true)}>
                <img className= "edit-icon" src= {edit} alt="" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Product</h2>
                        <label>
                            Code:
                            <input
                                type="text"
                                name="codigo"
                                value={productData.codigo}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="nombre"
                                value={productData.nombre}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="descripcion"
                                value={productData.descripcion}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Units:
                            <input
                                type="number"
                                name="cantidad"
                                value={productData.cantidad}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="precio"
                                value={productData.precio}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Categoría:
                            <select name="categoriaId" value={productData.categoriaId} onChange={handleInputChange}>
                                <option value="">Seleccione una categoría</option>
                                {categories.map((category) => (
                                    <option key={category.idCategoria} value={category.idCategoria}>
                                        {category.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Caracteristica 1:
                            <select name="caracteristicaId1" value={productData.caracteristicaId1} onChange={handleInputChange}>
                                <option value="">Seleccione una caracteristica</option>
                                {characteristics.map((characteristic) => (
                                    <option key={characteristic.idCaracteristica} value={characteristic.idCaracteristica}>
                                        {characteristic.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Caracteristica 2:
                            <select name="caracteristicaId2" value={productData.caracteristicaId2} onChange={handleInputChange}>
                                <option value="">Seleccione una caracteristica</option>
                                {characteristics.map((characteristic) => (
                                    <option key={characteristic.idCaracteristica} value={characteristic.idCaracteristica}>
                                        {characteristic.nombre}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Img URL:
                            <input
                                type="text"
                                name="imagen"
                                value={productData.imagen}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={handleEdit} className="modal__button">
                            {loading ? 'Editting...' : 'Save changes'}
                        </button>
                        <button onClick={() => setShowModal(false)} className="modal__button cancel">
                            Cancel
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProduct;
