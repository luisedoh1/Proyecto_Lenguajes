import { useState } from "react";
import axios from "axios";
import add from '../imgs/mas.gif';

const Addcategories = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categoriesData, setcategoriesData] = useState({
        name: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcategoriesData({ ...categoriesData, [name]: value });
    };


    const handleAdd = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("nombre", categoriesData.name);
        formData.append("descripcion", categoriesData.description);
        

        try {
            const response = await axios.post(`https://localhost:7105/categories/`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.status !== 201) {
                throw new Error('Error adding the category');
            }
            alert('category Added');
            window.location.reload();
        } catch (error) {
            setError(error.message);
            alert(error)
        } finally {
            setLoading(false);
            setShowModal(false);
        }
    };

    return (
        <div className="add-category-container">
            <button className="add-button" onClick={() => setShowModal(true)}>
                <img className="add-icon" src={add} alt="Add category" />
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add category</h2>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={categoriesData.name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                name="description"
                                value={categoriesData.description}
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

export default Addcategories;
