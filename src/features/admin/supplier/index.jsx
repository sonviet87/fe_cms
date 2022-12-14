import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const AdminSupplierAddEditPage = lazy(() => import('./pages/SupplierAddEditPage'));
const SupplierListPage = lazy(() => import('./pages/SupplierListPage'));

function AdminSuppliersFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<SupplierListPage />} />
                <Route path="/add" element={<AdminSupplierAddEditPage />} />
                <Route path="/:id" element={<AdminSupplierAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminSuppliersFeature;
