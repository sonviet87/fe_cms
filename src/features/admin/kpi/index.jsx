import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const AdminKpiGroupMemberAddEditPage = lazy(() => import('./pages/KpiGroupMemberAddEdit'));
const KpiGroupMemberListPage = lazy(() => import('./pages/KpiGroupMemberListPage'));
const KpiListPage = lazy(() => import('./pages/KpiListPage'));
const AdminKpiSettings = lazy(() => import('./pages/KpiSettingsPage'));

function AdminKPIFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<KpiListPage />} />
                <Route path="/group-member" element={<KpiGroupMemberListPage />} />
                <Route path="/group-member/add" element={<AdminKpiGroupMemberAddEditPage />} />
                <Route path="/group-member/:id" element={<AdminKpiGroupMemberAddEditPage />} />
                <Route path="/settings-1" element={<AdminKpiSettings />} />
            </Routes>
        </Suspense>
    );
}

export default AdminKPIFeature;
