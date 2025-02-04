import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const ConstsFixedListPage = lazy(() => import('./pages/ConstsFixedListPage'));
const ConstsTeamListPage = lazy(() => import('./pages/ConstsTeamListPage'));
const ConstsFixedAddEditPage = lazy(() => import('./pages/ConstsFixedAddEditPage'));
const ConstsTeamAddEditPage = lazy(() => import('./pages/ConstsTeamAddEditPage'));
const CostsPage = lazy(() => import('./pages/CostsPage'));



function AdminCostsFeature() {
    return (
        <Suspense>
            <Routes>

                <Route path="/" element={<CostsPage />} />
                <Route path="/costs-fixed" element={<ConstsFixedListPage />} />
                <Route path="/costs-fixed/add" element={<ConstsFixedAddEditPage />} />
                <Route path="/costs-fixed/:id" element={<ConstsFixedAddEditPage />} />
                <Route path="/costs-team" element={<ConstsTeamListPage />} />
                <Route path="/costs-team/add" element={<ConstsTeamAddEditPage />} />
                <Route path="/costs-team/:id" element={<ConstsTeamAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminCostsFeature;
