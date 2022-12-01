import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import FPExportExcel from './FPExportExcel';

// import { Container } from './styles';
const DATA = [
  {
    id: 101,
    name: 'Suman Kumar',
    parentName: 'Suresh Kumar',
    classroom: '12th',
    subject: 'Non Medical',
    division: '1st',
    status: 'Pass',
  },
  {
    id: 102,
    name: 'Rahul Kumar',
    parentName: 'Aatma Ram',
    classroom: '12th',
    subject: 'Non Medical',
    division: '1st',
    status: 'Pass',
  },
  {
    id: 103,
    name: 'Anuj Kumar',
    parentName: 'Ashok Kumar',
    classroom: '12th',
    subject: 'Non Medical',
    division: '1st',
    status: 'Pass',
  },
];
function FPHeaderPage({ isEdit, id }) {
  return (
    <WrapperBoxAlign align="space-between" isborder={0}>
      <TitleForm lable={isEdit ? 'Cập nhật FP' : 'Thêm FP '} isborder={0} />
      {isEdit && <FPExportExcel data={DATA} id={id} />}
    </WrapperBoxAlign>
  );
}

export default FPHeaderPage;
