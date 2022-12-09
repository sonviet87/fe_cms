import React from 'react';
import { Routes, Route } from 'react-router';
import AdminCategoryAddEditPage from './pages/CategoryAddEditPage';
import CategoryListPage from './pages/CategoryListPage';

function AdminCategoryFeature() {
    return (
        <Routes>
            <Route path="/" element={<CategoryListPage />} />
            <Route path="/add" element={<AdminCategoryAddEditPage />} />
            <Route path="/:id" element={<AdminCategoryAddEditPage />} />
        </Routes>
    );
}

export default AdminCategoryFeature;
