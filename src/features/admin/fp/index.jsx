import React from 'react';
import { Routes, Route } from 'react-router';
import AdminFPAddEditPage from './pages/FPAddEditPage';
import FPListPage from './pages/FPListPage';


function AdminFPsFeature() {
    return (
        <Routes>
            <Route path="/" element={<FPListPage />} />
            <Route path="/add" element={<AdminFPAddEditPage />} />
            <Route path="/:id" element={<AdminFPAddEditPage />} />
        </Routes>
    );
}

export default AdminFPsFeature;
