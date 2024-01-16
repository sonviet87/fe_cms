import React from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiForm from "../components/KpiForm";
import KpiFilter from "../components/KpiFilter";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import moment from "moment";
import {toast} from "react-toastify";
import kpiApi from "../../../../api/kpiAPI";
import kpiMemberGroupsApi from "../../../../api/kpiMemberGroupsAPI";

function KpiListPage() {
    const [loading, setLoading] = React.useState(false);
    const [memberGroup, setMemberGroup] = React.useState(false);

    const schema = yup.object().shape({
        startDay: yup.string().required('Xin hãy chọn ngày bắt đầu'),
        endDay: yup.string().required('Xin hãy chọn ngày kết thúc'),
    });

    const methods = useForm({
        defaultValues: {
            startDay: '',
            endDay: '',
            groupMember:'',
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

        setLoading(true);
        try {

            const res = await kpiApi.getAll(data);

            if (res.status) {
                if (res.data.status) {
                    toast.success(res.data.message);

                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {

        (async () => {
            setLoading(true);
            const res = await kpiMemberGroupsApi.getAll();
            try {
                if (res.status) {
                    console.log(res.data.data)
                    setMemberGroup(res.data.data);
                }
                else {
                    toast.error(res.message);
                }
            } catch (error) {
                toast.error("Bạn không có quyền truy cập");
                console.log('Lỗi hệ thống', error);
            }
            setLoading(false);
        })();
    }, [filter]);

    return (
        <WrapperPage>
            <TitleForm lable="KPI" />
            <KpiFilter loading={loading} filter={filter} onSubmit={handleFilter} memberGroup={memberGroup}   methods={methods}  />
            <KpiForm  methods={methods}  />
        </WrapperPage>
    );
}

export default KpiListPage;