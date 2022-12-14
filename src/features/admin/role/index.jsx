import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const RoleAddEditPage = lazy(() => import('./pages/RoleAddEditPage'));
const RoleListPage = lazy(() => import('./pages/RoleListPage'));


function AdminRolesFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<RoleListPage />} />
                <Route path="/add" element={<RoleAddEditPage />} />
                <Route path="/:id" element={<RoleAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminRolesFeature;
