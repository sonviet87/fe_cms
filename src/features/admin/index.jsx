import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminAccountFeature from './account';
import AdminCategoryFeature from './category';
import AdminContactFeature from './contact';
import DashBoard from './dashboard/pages/DashBoard';
import AdminDebtFeature from './debt';
import AdminDebtSupplierFeature from './debt_supplier';
import AdminFPsFeature from './fp';
import AdminReportFeature from './report';
import AdminReportDebtFPFeature from './reportDebtFP';
import AdminRolesFeature from './role';
import AdminSuppliersFeature from './supplier';
import AdminUsersFeature from './user';

const AdminFeature = () => {
  return (
    <Routes>
      <Route path="/" element={<DashBoard />} />
      <Route path={'/users/*'} element={<AdminUsersFeature />} />
      <Route path={'/roles/*'} element={<AdminRolesFeature />} />
      <Route path={'/contacts/*'} element={<AdminContactFeature />} />
      <Route path={'/accounts/*'} element={<AdminAccountFeature />} />
      <Route path={'/suppliers/*'} element={<AdminSuppliersFeature />} />
      <Route path={'/fps/*'} element={<AdminFPsFeature />} />
      <Route path={'/category/*'} element={<AdminCategoryFeature />} />
      <Route path={'/reports/*'} element={<AdminReportFeature />} />
      <Route path={'/debts/*'} element={<AdminDebtFeature />} />
      <Route path={'/debts-supplier/*'} element={<AdminDebtSupplierFeature />} />
      <Route path={'/reports-debt-fp/*'} element={<AdminReportDebtFPFeature />} />
    </Routes>
  );
};
export default AdminFeature;
