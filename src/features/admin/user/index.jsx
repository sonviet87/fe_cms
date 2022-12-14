import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';

const UserListPage = lazy(() => import('./pages/UserListPage'));
const AdminUserAddEditPage = lazy(() => import('./pages/UserAddEditPage'));
function AdminUsersFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<UserListPage />} />
                <Route path="/add" element={<AdminUserAddEditPage />} />
                <Route path="/:id" element={<AdminUserAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminUsersFeature;
