import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import FPExportExcel from './FPExportExcel';


function FPHeaderPage({ isEdit, id, fps }) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable={isEdit ? 'Cập nhật FP' : 'Thêm FP '} isborder={0} />
      {isEdit && <FPExportExcel data={fps.details} id={id} fps={fps} />}
    </WrapperBoxAlign>
  );
}

export default FPHeaderPage;
