import React from 'react';
import { Routes, Route } from 'react-router';
import AdminAccountAddEditPage from './pages/AccountAddEditPage';
import AccountListPage from './pages/AccountListPage';

function AdminAccountFeature() {
    return (
        <Routes>
            <Route path="/" element={<AccountListPage />} />
            <Route path="/add" element={<AdminAccountAddEditPage />} />
            <Route path="/:id" element={<AdminAccountAddEditPage />} />
        </Routes>
    );
}

export default AdminAccountFeature;
