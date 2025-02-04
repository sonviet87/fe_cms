import React,{useState} from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";

import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import moment from "moment";
import {toast} from "react-toastify";
import CostsForm from "../components/CostsForm";

import costsAPI from "../../../../api/costs";
import CostsFilter from "../components/CostsFilter";


function CostsPage() {
    const [loading, setLoading] = React.useState(false);

    const [list, setList] = React.useState({});

    const schemaNotQuarter = yup.object().shape({
        selectedYear: yup.string().required('Xin hãy chọn năm '),

    });


    const methods = useForm({
        defaultValues: {
            selectedYear: '',

        },
        resolver: yupResolver(schemaNotQuarter),
    });
    const percent = methods.watch('percent', 0);
    const year = methods.watch('selectedYear');
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
            const res = await costsAPI.getAll(formValues);

            if (res.status && res.data.status) {
                setList(res.data.data)

            } else {
                setList({});
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    }

    console.log(list)
    return (
        <WrapperPage>
            <TitleForm lable="Tổng chi phí" />
            <CostsFilter loading={loading} filter={filter} onSubmit={handleFilter}   methods={methods}  />
            {Object.keys(list).length !== 0 && <CostsForm    list={list} percent={percent}  year={year} />}

        </WrapperPage>
    );
}

export default CostsPage;