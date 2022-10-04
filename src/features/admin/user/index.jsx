import React from 'react';
import { Routes, Route } from 'react-router';
import UserListPage from './pages/UserListPage';


function AdminUsersFeature() {
    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
        </Routes>
    );
}

export default AdminUsersFeature;
