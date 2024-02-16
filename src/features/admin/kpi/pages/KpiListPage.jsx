import React,{useState} from 'react';
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

import {statusKpi} from "../constants/KpiConstants";

function KpiListPage() {
    const [loading, setLoading] = React.useState(false);
    const [memberGroup, setMemberGroup] = React.useState(false);
    const [list, setList] = React.useState({});
    const [selectedTypeKpi, setSelectedTypeKpi] = useState(statusKpi.KPI_MONTHS);
    const schemaNotQuarter = yup.object().shape({
        selectedDay: yup.string().required('Xin hãy chọn ngày '),
        groupMember: yup.string().required('Xin hãy chọn nhóm'),

    });
    const schemaQuarter = yup.object().shape({
        selectedDay: yup.string().required('Xin hãy chọn ngày '),
        groupMember: yup.string().required('Xin hãy chọn nhóm'),
        kpiTypeQuarter: yup.string().required('Xin hãy chọn Quý'),

    });

    const methods = useForm({
        defaultValues: {
            startDay: '',
            endDay: '',
            selectedDay: '',
            groupMember:'',
            kpiTypeQuarter: '',
            kpiType: 1
        },
        resolver: yupResolver(selectedTypeKpi === statusKpi.KPI_3_MONTHS? schemaQuarter : schemaNotQuarter),
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
                toast.success(res.data.message);
                setList(res.data.data)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    }

    React.useEffect(() => {

        //console.log(test)
        (async () => {
            setLoading(true);
            const res = await kpiMemberGroupsApi.getAll();
            try {
                if (res.status) {

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
    }, []);

    return (
        <WrapperPage>
            <TitleForm lable="KPI" />
            <KpiFilter loading={loading} filter={filter} onSubmit={handleFilter} memberGroup={memberGroup} selectedTypeKpi={selectedTypeKpi} setSelectedTypeKpi={setSelectedTypeKpi}   methods={methods}  />
            {Object.keys(list).length !== 0 && <KpiForm  methods={methods} selectedTypeKpi={selectedTypeKpi} list={list}  />}

        </WrapperPage>
    );
}

export default KpiListPage;