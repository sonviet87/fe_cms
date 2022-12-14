import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
const AdminCategoryAddEditPage = lazy(() => import('./pages/CategoryAddEditPage'));
const CategoryListPage = lazy(() => import('./pages/CategoryListPage'));
function AdminCategoryFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<CategoryListPage />} />
                <Route path="/add" element={<AdminCategoryAddEditPage />} />
                <Route path="/:id" element={<AdminCategoryAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminCategoryFeature;
