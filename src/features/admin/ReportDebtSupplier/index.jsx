import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const ReportDebtSupplierListPage = lazy(() => import('./pages/ReportDebtSupplierListPage'));

function AdminReportDebtSupplierFeature() {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<ReportDebtSupplierListPage />} />
      </Routes>
    </Suspense>
  );
}

export default AdminReportDebtSupplierFeature;
