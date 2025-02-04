import React,{useState} from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import moment from "moment";
import {toast} from "react-toastify";

import KpiTechnicalFilter from "../components/KpiTechnicalFilter";
import KpiTechnicalForm from "../components/KpiTechnicalForm";
import kpiSettingTechnicalAPI from "../../../../api/kpiSettingTechnicalAPI";
import kpiTechnicalApi from "../../../../api/kpiTechnicalAPI";

function KpiListTechnicalPage() {
    const [loading, setLoading] = React.useState(false);
    const [memberGroup, setMemberGroup] = React.useState(false);
    const [list, setList] = React.useState({});
    const selectedTypeKpi = 12;
    const schemaNotQuarter = yup.object().shape({
        selectedYear: yup.string().required('Xin hãy chọn năm '),
        groupMember: yup.string().required('Xin hãy chọn kpi'),

    });


    const methods = useForm({
        defaultValues: {
            selectedYear: '',
            groupMember:'',
        },
        resolver: yupResolver(schemaNotQuarter),
    });

    const [filter, setFilter] = React.useState({
        per_page: 10,
        page: 0,
    });

    const handleFilter = async (formValues) => {


        formValues.selectedYear = moment(formValues.selectedYear).year();

        setFilter({
            ...filter,
            ...formValues,
        });

        setLoading(true);
        try {
            const res = await kpiTechnicalApi.getAll(formValues);
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

    const handleKpiSetting = async (year) => {
        setLoading(true);
        const res = await kpiSettingTechnicalAPI.getAll({'year':year});
        try {
            if (res.status && res.data.status) {
                console.log(res)
                setMemberGroup(res.data.data);
            } else {

                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Bạn không có quyền truy cập");
            console.log('Lỗi hệ thống', error);
        }
        setLoading(false);

    }

    return (
        <WrapperPage>
            <TitleForm lable="KPI" />
            <KpiTechnicalFilter loading={loading} filter={filter} onGetKpiSetting = {handleKpiSetting} onSubmit={handleFilter} memberGroup={memberGroup}    methods={methods}  />
            {Object.keys(list).length !== 0 && <KpiTechnicalForm  methods={methods} selectedTypeKpi={selectedTypeKpi} list={list}  />}

        </WrapperPage>
    );
}

export default KpiListTechnicalPage;