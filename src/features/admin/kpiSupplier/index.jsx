import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';

const KpiSettingSupplierPage = lazy(() => import('./pages/KpiSettingSupplierPage'));
const KpiSettingSupplierAddEditPage = lazy(() => import('./pages/KpiSettingSupplierAddEditPage'));
const KpiListSupplierPage = lazy(() => import('./pages/KpiListSupplierPage'));


function AdminKPISupplierFeature() {
    return (
        <Suspense>
            <Routes>

                <Route path="/" element={<KpiListSupplierPage />} />
                <Route path="/kpi-setting-supplier" element={<KpiSettingSupplierPage />} />
                <Route path="/kpi-setting-supplier/add" element={<KpiSettingSupplierAddEditPage />} />
                <Route path="/kpi-setting-supplier/:id" element={<KpiSettingSupplierAddEditPage />} />

            </Routes>
        </Suspense>
    );
}

export default AdminKPISupplierFeature;
