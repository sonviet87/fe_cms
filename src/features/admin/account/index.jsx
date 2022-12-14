import React, { Suspense } from 'react';
import { lazy } from 'react';
import { Routes, Route } from 'react-router';
const AdminAccountAddEditPage = lazy(() => import('./pages/AccountAddEditPage'));
const AccountListPage = lazy(() => import('./pages/AccountListPage'));

function AdminAccountFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<AccountListPage />} />
                <Route path="/add" element={<AdminAccountAddEditPage />} />
                <Route path="/:id" element={<AdminAccountAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminAccountFeature;
