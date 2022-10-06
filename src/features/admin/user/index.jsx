import React from 'react';
import { Routes, Route } from 'react-router';
import AdminUserAddEditPage from './pages/UserAddEditPage';
import UserListPage from './pages/UserListPage';


function AdminUsersFeature() {
    return (
        <Routes>
            <Route path="/" element={<UserListPage />} />
            <Route path="/add" element={<AdminUserAddEditPage />} />
            <Route path="/:id" element={<AdminUserAddEditPage />} />
        </Routes>
    );
}

export default AdminUsersFeature;
