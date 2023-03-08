import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportDebtFPExportExcel from './ReportDebtFPExportExcel';

function ReportDebtFPHeaderPage({ list, filter ,methods}) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable="Thống kê công nợ khách hàng" isborder={0} />
      <ReportDebtFPExportExcel data={list} filter={filter} methods={methods}/>
    </WrapperBoxAlign>
  );
}

export default ReportDebtFPHeaderPage;
