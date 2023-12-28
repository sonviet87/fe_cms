import fpApi from 'api/fpAPI';
import reportDebtFPApi from 'api/reportDebtFPAPI';
import SkeletonList from 'components/Common/Skeleton/SkeletonList';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import moment from 'moment';
import React from 'react';
import ReportDebtFPFilter from '../components/ReportDebtFPFilter';
import ReportDebtFPHeaderPage from '../components/ReportDebtFPHeaderPage';
import ReportList from '../components/ReportDebtFPList';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import reportApi from "../../../../api/reportAPI";

function ReportDebtFPListPage() {
    const [loading, setLoading] = React.useState(false);
    const [fps, setFps] = React.useState([]);
    const [list, setList] = React.useState({
        reports: [],
        sumValues:'(Tổng PAKD: <b>0</b> / Tổng giá bán: <b>0</b> / Tổng giá bán (VAT): <b>0</b> /Tổng lợi nhuận: <b>0</b>)',
        pagination: {
            total: 0,
            current_page: 0
        },
    });
    const schema = yup.object().shape({
        startDay: yup.string().required('Xin hãy chọn ngày bắt đầu'),
        endDay: yup.string().required('Xin hãy chọn ngày kết thúc'),
    });

    const methods = useForm({
        defaultValues: {
            startDay: '',
            endDay: '',
            user_id: '',
            account_id: '',
            fp_id: '',
            isDone: '',

        },
        resolver: yupResolver(schema),
    });
    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
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
        const res = await reportDebtFPApi.getList(params);
        const paramsSum = {...params, list: 'list'};
        const resSum = await reportDebtFPApi.getList(paramsSum);
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
    React.useEffect(() => {

        (async () => {
            try {
                const fpRs = await fpApi.getList()
                if (fpRs.status) {
                    const fpList = fpRs.data.data.map((item) => { return { id: item.id, name: item.code } })
                    setFps(fpList);
                }
            } catch (error) {
                console.log('get fp by id error', error);
            }
        })();
    }, []);

    const handleTotalFP = (data) => {
        if (data.length === 0) return '(Tổng PAKD: <b>0</b> / Tổng giá bán: <b>0</b> / Tổng giá bán (VAT): <b>0</b> /Tổng lợi nhuận: <b>0</b>)';
        let totalSelling = 0;
        let totalMargin = 0;
        let totalVAT = 0;
        let totalFP = 0;
        data.map((item, index) => {
            totalSelling += parseInt(item.fp?.selling);
            totalMargin += parseInt(item.fp?.margin);
            totalVAT += parseInt(item?.total_debt);
            totalFP++;
            return item;
        })

        return `(Tổng PAKD: <b>${totalFP}</b> / Tổng giá bán: <b>${totalSelling.toLocaleString()}</b>  / Tổng giá bán (VAT): <b>${totalVAT.toLocaleString()}</b> / Tổng lợi nhuận: <b>${totalMargin.toLocaleString()}</b>)`
    }

    return (
        <WrapperPage>
            <ReportDebtFPHeaderPage list={list.reports} filter={filter} methods={methods}/>
            <ReportDebtFPFilter loading={loading} filter={filter} onSubmit={handleFilter} fps={fps} methods={methods}   />
            {loading ? (
                <SkeletonList />
            ) : (<ReportList list={list.reports}
                pagination={list.pagination}
                loading={loading}
                filter={filter}
                onFilter={handleFilter}
                methods={methods}
                sumValues={list.sumValues}
            />)}
        </WrapperPage>
    );
}

export default ReportDebtFPListPage;