import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';
const AdminDebtAddEditPage = lazy(() => import('./pages/DebtAddEditPage'));
const DebtListPage = lazy(() => import('./pages/DebtListPage'));

function AdminDebtFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<DebtListPage />} />
                <Route path="/add" element={<AdminDebtAddEditPage />} />
                <Route path="/:id" element={<AdminDebtAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminDebtFeature;
