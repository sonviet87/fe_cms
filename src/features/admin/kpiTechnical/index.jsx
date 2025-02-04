import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router';
const AdminTechnicalCertificatePage = lazy(() => import('./pages/ListTechnicalCertificatePage'));
const AdminTechnicalCertificateAddEditPage = lazy(() => import('./pages/TechnicalCertificateAddEditPage'));
const AdminTechnicalProjectPage = lazy(() => import('./pages/ListTechnicalProjectPage'));
const AdminTechnicalProjectAddEditPage = lazy(() => import('./pages/TechnicalProjectAddEditPage'));
const AdminTechnicalReviewPage = lazy(() => import('./pages/ListTechnicalReviewPage'));
const AdminTechnicalReviewAddEditPage = lazy(() => import('./pages/TechnicalReviewAddEditPage'));
const AdminKpiSettingTechnicalPage = lazy(() => import('./pages/KpiSettingTechnicalPage'));
const AdminKpiSettingTechnicalEdit = lazy(() => import('./pages/KpiSettingTechnicalEdit'));
const AdminKpiListTechnicalPage = lazy(() => import('./pages/KpiListTechnicalPage'));
function AdminKPITechnicalFeature() {
    return (
        <Suspense>
            <Routes>
                <Route path="/kpi-technical" element={<AdminKpiListTechnicalPage />} />
                <Route path="/kpi-setting-technical" element={<AdminKpiSettingTechnicalPage />} />
                <Route path="/kpi-setting-technical/add" element={<AdminKpiSettingTechnicalEdit />} />
                <Route path="/kpi-setting-technical/:id" element={<AdminKpiSettingTechnicalEdit />} />
                <Route path="/technical-certificate" element={<AdminTechnicalCertificatePage />} />
                <Route path="/technical-certificate/add" element={<AdminTechnicalCertificateAddEditPage />} />
                <Route path="/technical-certificate/:id" element={<AdminTechnicalCertificateAddEditPage />} />
                <Route path="/technical-project" element={<AdminTechnicalProjectPage />} />
                <Route path="/technical-project/add" element={<AdminTechnicalProjectAddEditPage />} />
                <Route path="/technical-project/:id" element={<AdminTechnicalProjectAddEditPage />} />
                <Route path="/technical-review" element={<AdminTechnicalReviewPage />} />
                <Route path="/technical-review/add" element={<AdminTechnicalReviewAddEditPage />} />
                <Route path="/technical-review/:id" element={<AdminTechnicalReviewAddEditPage />} />
            </Routes>
        </Suspense>
    );
}

export default AdminKPITechnicalFeature;
