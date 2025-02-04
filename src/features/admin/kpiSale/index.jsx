import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const AdminKpiSetupUserAddEditPage = lazy(() => import('./pages/KpiSetupUserAddEdit'));
const KpiSetupUserListPage = lazy(() => import('./pages/KpiSetupUserListPage'));
const KpiListSalePage = lazy(() => import('./pages/KpiListSalePage'));
const AdminKpiSettings = lazy(() => import('./pages/KpiSettingsTotalPage'));

function AdminKPISaleFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<KpiListSalePage />} />
                <Route path="/setup-user" element={<KpiSetupUserListPage />} />
                <Route path="/setup-user/add" element={<AdminKpiSetupUserAddEditPage />} />
                <Route path="/setup-user/:id" element={<AdminKpiSetupUserAddEditPage />} />
                <Route path="/settings-sale" element={<AdminKpiSettings />} />
                <Route path="/settings-total" element={<AdminKpiSettings />} />
            </Routes>
        </Suspense>
    );
}

export default AdminKPISaleFeature;
