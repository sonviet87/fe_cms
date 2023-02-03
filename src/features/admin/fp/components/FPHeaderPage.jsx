import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fpActions } from '../fpSlice';
import { FPButtonApproved } from './FPButtonApproved';
import FPExportExcel from './FPExportExcel';

function FPHeaderPage({ isEdit, id, fps }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(fps?.status);
  React.useEffect(() => {
    //console.log(fps.status);
    setStatus(fps?.status);
  }, [fps?.status]);
  const handleChangeStatus = (status) => {
    setStatus(status);
    dispatch(fpActions.setStatus(status));
  };
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable={isEdit ? 'Cập nhật phương án kinh doanh' : 'Thêm phương án kinh doanh '} isborder={0} />
      {isEdit && (
        <div>
          {' '}
          <FPButtonApproved status={status} onChangeStatus={handleChangeStatus} />
          <FPExportExcel data={fps.details} id={id} fps={fps} status={status} />
        </div>
      )}
    </WrapperBoxAlign>
  );
}

export default FPHeaderPage;
