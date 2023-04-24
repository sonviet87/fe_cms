import reportApi from 'api/reportAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import moment from 'moment';
import React from 'react';
import ReportChart from '../components/ReportChart';
import ReportFilter from '../components/ReportFilter';
import ReportHeaderPage from '../components/ReportHeaderPage';
import ReportList from '../components/ReportList';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

function ReportListPage() {
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
            user_id: '',
            supplier_id: '',
            account_id: '',
            category_id: '',
            type_fp: '',

        },
        resolver: yupResolver(schema),
    });

    const [list, setList] = React.useState({
        reports: [],
        pagination: {
            total: 0,
            current_page: 0
        },
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

        const res = await reportApi.getList(params);

        if (res.status) {
            setList({
                reports: res.data.data,
                pagination: {
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page
                },
            });
        }
        setLoading(false);
    }

    const handleChangeStatusReport = (value) => {
        setIsReport(value);
    }

    return (
        <WrapperPage>
            <ReportHeaderPage list={list.reports} filter={filter} onHandleIsReport={handleChangeStatusReport} methods={methods} />
            <ReportFilter loading={loading} filter={filter} onSubmit={handleFilter} methods={methods}   />
            {loading ? (
                <SkeletonList />
            ) : (!isReport ? <ReportList list={list.reports}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                methods={methods}
            /> : '')}
            {isReport && <ReportChart list={list.reports} />}
        </WrapperPage>
    );
}

export default ReportListPage;