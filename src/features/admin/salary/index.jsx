import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const SalaryAddEditPage = lazy(() => import('./pages/SalaryAddEditPage'));
const SalaryListPage = lazy(() => import('./pages/SalaryListPage'));

function AdminSalaryFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<SalaryListPage />} />
                <Route path="/add" element={<SalaryAddEditPage />} />
                <Route path="/:id" element={<SalaryAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminSalaryFeature;
