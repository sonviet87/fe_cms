import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';
const WarrantyAddEditPage = lazy(() => import('./pages/WarrantyAddEditPage'));
const WarrantyListPage = lazy(() => import('./pages/WarrantyListPage'));

function AdminWarrantyFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<WarrantyListPage />} />
                <Route path="/add" element={<WarrantyAddEditPage />} />
                <Route path="/:id" element={<WarrantyAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminWarrantyFeature;
