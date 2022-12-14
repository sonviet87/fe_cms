import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const AdminContactAddEditPage = lazy(() => import('./pages/ContactAddEditPage'));
const ContactListPage = lazy(() => import('./pages/ContactListPage'));

function AdminContactFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<ContactListPage />} />
                <Route path="/add" element={<AdminContactAddEditPage />} />
                <Route path="/:id" element={<AdminContactAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminContactFeature;
