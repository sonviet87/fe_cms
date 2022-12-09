import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAccountFeature from './account';
import AdminCategoryFeature from './category';
import AdminContactFeature from './contact';
import DashBoard from './dashboard/pages/DashBoard';
import AdminFPsFeature from './fp';
import AdminRolesFeature from './role';
import AdminSuppliersFeature from './supplier';
import AdminUsersFeature from './user';

const AdminFeature = () => {
    return (
        <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path={'/users/*'} element={<AdminUsersFeature />} />
            <Route path={'/roles/*'} element={<AdminRolesFeature />} />
            <Route path={'/contacts/*'} element={<AdminContactFeature />} />
            <Route path={'/accounts/*'} element={<AdminAccountFeature />} />
            <Route path={'/suppliers/*'} element={<AdminSuppliersFeature />} />
            <Route path={'/fps/*'} element={<AdminFPsFeature />} />
            <Route path={'/category/*'} element={<AdminCategoryFeature />} />
        </Routes>
    );
};
export default AdminFeature;