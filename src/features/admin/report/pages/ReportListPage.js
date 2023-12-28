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
        sumValues: '(Tổng PAKD: <b>0</b> / Tổng giá bán: <b>0</b> / Tổng lợi nhuận: <b>0</b>)',
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
        const paramsSum = {...params, list: 'list'};
        const resSum = await reportApi.getList(paramsSum);
        if (res.status) {
            const sumValues = handleTotalFP(resSum.data.data);
            setList({
                reports: res.data.data,
                sumValues: sumValues,
                pagination: {
                    total: res.data.meta.total,
                    current_page: res.data.meta.current_page
                },
            });
        }
        setLoading(false);
    }

    const handleTotalFP = (data) => {
        if (data.length === 0) return '(Tổng PAKD: <b>0</b> / Tổng giá bán: <b>0</b> / Tổng lợi nhuận: <b>0</b>)';
        let totalSelling = 0;
        let totalMargin = 0;
        let totalFP = 0;
        data.map((item, index) => {
            totalSelling += parseInt(item.selling);
            totalMargin += parseInt(item.margin);
            totalFP++;
            return item;
        })

        return `(Tổng PAKD: <b>${totalFP}</b> / Tổng giá bán: <b>${totalSelling.toLocaleString()}</b> / Tổng lợi nhuận: <b>${totalMargin.toLocaleString()}</b>)`
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
            ) : (!isReport ? <ReportList list={list.reports} sumValues={list.sumValues}
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