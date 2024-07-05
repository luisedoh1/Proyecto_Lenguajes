/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchCategories, fetchCharacteristics } from "../Product/api";
import axios from "axios";
import add from '../imgs/mas.gif';
import './AddProduct.css';

const AddProduct = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [characteristics, setCharacteristics] = useState([]);
    const [productData, setProductData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        cantidad: 0,
        categoriaId: 0,
        imagen: '',
        precio: 0,
        caracteristicaId1: 0,
        caracteristicaId2: null
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleAdd = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/products', productData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 201) {
                throw new Error('Error adding the product');
            }
            alert('Product Added');
            window.location.reload();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="add-product-container">
            <button className="add-button" onClick={() => setShowModal(true)}>
                <img className="add-icon" src={add} alt="Add product" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add Product</h2>
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
                        <button onClick={handleAdd} className="modal__button">
                            {loading ? 'Adding...' : 'Save changes'}
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

export default AddProduct;