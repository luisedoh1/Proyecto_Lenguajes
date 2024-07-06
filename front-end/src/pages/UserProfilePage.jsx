import React, { useState } from 'react';
import UserInfo from '../components/User/UserInfo';
import UserPayment from '../components/User/UserPayment';
import UserAddress from '../components/User/UserAddress';
import '../components/User/UserProfile.css';

const UserProfilePage = () => {
    const [update, setUpdate] = useState(false);

    const handleUpdate = () => {
        setUpdate(!update);
    };

    return (
        <div className="user-profile-container">
            <h1 className="user-profile-title">User Profile</h1>
            <UserInfo onUpdate={handleUpdate} />
            <UserAddress onUpdate={handleUpdate} />
            <UserPayment onUpdate={handleUpdate} />
        </div>
    );
};

export default UserProfilePage;
