import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import ReportFPExportExcel from './ReportFPExportExcel';

function ReportHeaderPage({ list, filter }) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable="Thống kê phương án kinh doanh" isborder={0} />
      <ReportFPExportExcel data={list} filter={filter} />
    </WrapperBoxAlign>
  );
}

export default ReportHeaderPage;
