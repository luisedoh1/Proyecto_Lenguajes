import React from 'react';
import UserInfo from '../components/User/UserInfo';
import UserCards from '../components/User/UserCards';
import UserAddress from '../components/User/UserAddress';
import '../components/User/UserProfile.css';

const UserProfilePage = () => {
    return (
        <div className="user-profile-container">
            <h1 className="user-profile-title">User Profile</h1>
            
            <UserAddress />
        </div>
    );
};

export default UserProfilePage;
