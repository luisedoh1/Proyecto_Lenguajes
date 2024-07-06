import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserCards = () => {
    const [cards, setCards] = useState([]);
    const [newCard, setNewCard] = useState({ token: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserCards = async (id) => {
            try {
                const response = await axios.get(`https://luisedoh1-001-site1.etempurl.com/Payment/${id}`);
                setCards(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserCards();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleAddCard = async () => {
        try {
            const response = await axios.post('https://luisedoh1-001-site1.etempurl.com/Payment', newCard);
            setCards([...cards, response.data]);
            setNewCard({ token: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteCard = async (id) => {
        try {
            await axios.delete(`https://luisedoh1-001-site1.etempurl.com/Payment/${id}`);
            setCards(cards.filter(card => card.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-cards">
            <h2>Payment Methods</h2>
            <input
                type="text"
                name="token"
                value={newCard.token}
                onChange={handleInputChange}
                placeholder="Card Token"
            />
            <button onClick={handleAddCard}>Add Card</button>
            <ul>
                {cards.map(card => (
                    <li key={card.id}>
                        {card.token}
                        <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserCards;