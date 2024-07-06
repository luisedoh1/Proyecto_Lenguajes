import React from 'react';
import UserInfo from '../components/User/UserInfo';
import UserPayment from '../components/User/UserPayment';
import UserAddress from '../components/User/UserAddress';
import '../components/User/UserProfile.css';

const UserProfilePage = () => {
    return (
        <div className="user-profile-container">
            <h1 className="user-profile-title">User Profile</h1>
            <UserInfo/>
            <UserAddress/>
            <UserPayment/>
        </div>
    );
};

export default UserProfilePage;
