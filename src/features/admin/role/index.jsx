import React from 'react';
import { Routes, Route } from 'react-router';
import RoleAddEditPage from './pages/RoleAddEditPage';
import RoleListPage from './pages/RoleListPage';



function AdminRolesFeature() {
    return (
        <Routes>
            <Route path="/" element={<RoleListPage />} />
            <Route path="/add" element={<RoleAddEditPage />} />
            <Route path="/:id" element={<RoleAddEditPage />} />
        </Routes>
    );
}

export default AdminRolesFeature;
