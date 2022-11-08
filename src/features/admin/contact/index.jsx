import React from 'react';
import { Routes, Route } from 'react-router';
import AdminContactAddEditPage from './pages/ContactAddEditPage';
import ContactListPage from './pages/ContactListPage';


function AdminContactFeature() {
    return (
        <Routes>
            <Route path="/" element={<ContactListPage />} />
            <Route path="/add" element={<AdminContactAddEditPage />} />
            <Route path="/:id" element={<AdminContactAddEditPage />} />
        </Routes>
    );
}

export default AdminContactFeature;
