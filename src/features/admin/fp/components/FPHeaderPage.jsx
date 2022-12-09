import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React, { useState } from 'react';
import { FPButtonApproved } from './FPButtonApproved';
import FPExportExcel from './FPExportExcel';


function FPHeaderPage({ isEdit, id, fps }) {
  const [status, setStatus] = useState(fps?.status);
  React.useEffect(() => {
    setStatus(fps?.status)

  }, [fps?.status])
  const handleChangeStatus = (status) => {
    setStatus(status)
  }
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable={isEdit ? 'Cập nhật FP' : 'Thêm FP '} isborder={0} />
      {isEdit && (<div> <FPButtonApproved status={status} onChangeStatus={handleChangeStatus} /><FPExportExcel data={fps.details} id={id} fps={fps} status={status} /></div>)}
    </WrapperBoxAlign>
  );
}

export default FPHeaderPage;
