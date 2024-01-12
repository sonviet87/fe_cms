import React from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiForm from "../components/KpiForm";
import KpiFilter from "../components/KpiFilter";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import moment from "moment";

function KpiListPage() {
    const [loading, setLoading] = React.useState(false);
    const [isReport, setIsReport] = React.useState(false);
    const schema = yup.object().shape({
        startDay: yup.string().required('Xin hãy chọn ngày bắt đầu'),
        endDay: yup.string().required('Xin hãy chọn ngày kết thúc'),
    });

    const methods = useForm({
        defaultValues: {
            startDay: '',
            endDay: '',
        },
        resolver: yupResolver(schema),
    });

    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
        //list: 'list'
    });

    const handleFilter = async (data) => {
        data.startDay = moment(data.startDay).format('YYYY-MM-DD');
        data.endDay = moment(data.endDay).format('YYYY-MM-DD');
        setFilter({
            ...filter,
            ...data,
        });
        const params = {
            ...filter,
            ...data,
        }
        setLoading(true);
        setLoading(false);
    }

    return (
        <WrapperPage>
            <TitleForm lable="KPI" />
            <KpiFilter loading={loading} filter={filter} onSubmit={handleFilter} methods={methods}   />
            <KpiForm />
        </WrapperPage>
    );
}

export default KpiListPage;