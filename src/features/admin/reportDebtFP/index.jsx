import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const ReportDebtFPListPage = lazy(() => import('./pages/ReportDebtFPListPage'));

function AdminReportDebtFPFeature() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<ReportDebtFPListPage />} />
      </Routes>
    </Suspense>
  );
}

export default AdminReportDebtFPFeature;
