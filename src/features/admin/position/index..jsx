import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';
const AdminPositionListPage = lazy(() => import('./pages/PositionListPage'));
const AdminPositionAddEditPage = lazy(() => import('./pages/PositionAddEditPage'));

function AdminPositionFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<AdminPositionListPage />} />
                <Route path="/add" element={<AdminPositionAddEditPage />} />
                <Route path="/:id" element={<AdminPositionAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminPositionFeature;
