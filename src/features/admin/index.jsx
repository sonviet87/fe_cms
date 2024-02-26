import React, {useEffect} from 'react';
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
import AdminReportDebtSupplierFeature from './ReportDebtSupplier';
import AdminRolesFeature from './role';
import AdminSuppliersFeature from './supplier';
import AdminUsersFeature from './user';
import AdminWarrantyFeature from './warranty';

import Echo from "laravel-echo";
import SendMessages from "./messages/sendMessages";
import AdminKPIFeature from "./kpi";
import AdminSalaryFeature from "./salary";
import AdminChanceFeature from "./chance";

const AdminFeature = () => {
    useEffect(() => {
        (async () => {

                //add socket
                // const echo = new Echo({
                //     broadcaster: "socket.io",
                //     host: 'http://redisfe.sonnguyen.top:6001',
                //     auth: {
                //         headers: {
                //             Authorization: 'Bearer ' + localStorage.getItem('access_token')
                //         }
                //     }
                // })
                // echo.join('chat')
                //     .here((data1) => {
                //         console.log("du lieu",data1)
                //     })
        })();
    }, []);
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
      <Route path={'/reports-debt-supplier/*'} element={<AdminReportDebtSupplierFeature />} />
      <Route path={'/warranty/*'} element={<AdminWarrantyFeature />} />
      <Route path={'/kpi/*'} element={<AdminKPIFeature />} />
      <Route path={'/send/*'} element={<SendMessages />} />
      <Route path={'/salaries/*'} element={<AdminSalaryFeature />} />
      <Route path={'/chances/*'} element={<AdminChanceFeature />} />
    </Routes>
  );
};
export default AdminFeature;
