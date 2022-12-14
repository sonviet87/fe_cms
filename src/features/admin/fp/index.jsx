import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const AdminFPAddEditPage = lazy(() => import('./pages/FPAddEditPage'));
const FPListPage = lazy(() => import('./pages/FPListPage'));

function AdminFPsFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<FPListPage />} />
                <Route path="/add" element={<AdminFPAddEditPage />} />
                <Route path="/:id" element={<AdminFPAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminFPsFeature;
