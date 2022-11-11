import React from 'react';
import { Routes, Route } from 'react-router';
import AdminSupplierAddEditPage from './pages/SupplierAddEditPage';
import SupplierListPage from './pages/SupplierListPage';

function AdminSuppliersFeature() {
    return (
        <Routes>
            <Route path="/" element={<SupplierListPage />} />
            <Route path="/add" element={<AdminSupplierAddEditPage />} />
            <Route path="/:id" element={<AdminSupplierAddEditPage />} />
        </Routes>
    );
}

export default AdminSuppliersFeature;
