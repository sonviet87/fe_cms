import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';

const AdminDebtSupplierAddEditPage = lazy(() => import('./pages/DebtSupplierAddEditPage'));
const DebtSupplierListPage = lazy(() => import('./pages/DebtSupplierListPage'));

function AdminDebtSupplierFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<DebtSupplierListPage />} />
                <Route path="/add" element={<AdminDebtSupplierAddEditPage />} />
                <Route path="/:id" element={<AdminDebtSupplierAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminDebtSupplierFeature;
