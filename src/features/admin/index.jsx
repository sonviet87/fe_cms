import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAccountFeature from './account';
import AdminContactFeature from './contact';
import DashBoard from './dashboard/pages/DashBoard';
import AdminRolesFeature from './role';
import AdminUsersFeature from './user';



const AdminFeature = () => {
    return (
        <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path={'/users/*'} element={<AdminUsersFeature />} />
            <Route path={'/roles/*'} element={<AdminRolesFeature />} />
            <Route path={'/contacts/*'} element={<AdminContactFeature />} />
            <Route path={'/accounts/*'} element={<AdminAccountFeature />} />
        </Routes>
    );
};
export default AdminFeature;