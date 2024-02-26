import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';
const AdminChanceAddEditPage = lazy(() => import('./pages/ChanceAddEditPage'));
const ChanceListPage = lazy(() => import('./pages/ChanceListPage'));

function AdminChanceFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<ChanceListPage />} />
                <Route path="/add" element={<AdminChanceAddEditPage />} />
                <Route path="/:id" element={<AdminChanceAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminChanceFeature;
