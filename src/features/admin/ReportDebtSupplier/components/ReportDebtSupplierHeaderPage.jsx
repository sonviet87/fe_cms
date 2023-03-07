import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportDebtSupplierExportExcel from './ReportDebtSupplierExportExcel';


function ReportDebtSupplierHeaderPage({ list, filter ,methods}) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable="Thống kê công nợ nhà cung cấp" isborder={0} />
      <ReportDebtSupplierExportExcel data={list} filter={filter} methods={methods}/>
    </WrapperBoxAlign>
  );
}

export default ReportDebtSupplierHeaderPage;
