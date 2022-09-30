import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './dashboard/pages/DashBoard';


const AdminFeature = () => {
    return (
        <Routes>
            <Route path="/" element={<DashBoard />} />
        </Routes>
    );
};
export default AdminFeature;