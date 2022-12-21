import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const ReportListPage = lazy(() => import('./pages/ReportListPage'));

function AdminReportFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<ReportListPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminReportFeature;
