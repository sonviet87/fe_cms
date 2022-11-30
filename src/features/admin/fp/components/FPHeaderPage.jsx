import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import React from 'react';
import FPExportExcel from './FPExportExcel';

// import { Container } from './styles';
const DATA = [
    {
        STUDENT_DETAILS: {
            id: 101,
            name: "Suman Kumar",
            parentName: "Suresh Kumar",
            classroom: "12th",
            subject: "Non Medical",
            division: "1st",
            status: "Pass",
        },
        MARKS: {
            maths: 75,
            physics: 65,
            chemistry: 72,
            english: 62,
            computerScience: 80,
        },
    },
    {
        STUDENT_DETAILS: {
            id: 102,
            name: "Rahul Kumar",
            parentName: "Aatma Ram",
            classroom: "12th",
            subject: "Non Medical",
            division: "1st",
            status: "Pass",
        },
        MARKS: {
            maths: 70,
            physics: 75,
            chemistry: 82,
            english: 72,
            computerScience: 60,
        },
    },
    {
        STUDENT_DETAILS: {
            id: 103,
            name: "Anuj Kumar",
            parentName: "Ashok Kumar",
            classroom: "12th",
            subject: "Non Medical",
            division: "1st",
            status: "Pass",
        },
        MARKS: {
            maths: 60,
            physics: 65,
            chemistry: 92,
            english: 77,
            computerScience: 80,
        },
    },
];
function FPHeaderPage({ isEdit }) {
    return <WrapperBoxAlign align="space-between" haveBorder={false}>
        <TitleForm lable={isEdit ? "Cập nhật FP" : "Thêm FP "} haveBorder={false} />
        {isEdit && (<FPExportExcel data={DATA} />)}

    </WrapperBoxAlign>
}

export default FPHeaderPage;