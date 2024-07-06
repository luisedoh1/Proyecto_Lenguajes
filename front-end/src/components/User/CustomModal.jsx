import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onRequestClose}>
            <div className="modalProfile" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onRequestClose}>X</button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;