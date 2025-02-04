import React from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiSetupUserForm from "../components/KpiSetupUserForm";
import {toast} from "react-toastify";

import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";
import kpiSetUpUserApi from "../../../../api/kpiSetUpUserAPI";


function KpiSetupUserAddEditPage() {
    const [kpiSetUpUser, setKpiSetUpUser] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [searchParams] = useSearchParams();
    const copyValue = searchParams.get("copy") || "";
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const validationRules = {
       name: yup.string().required('Xin hãy điền tên nhóm').nullable(),
        user_assign: yup.string().required('Xin hãy chọn người dùng').nullable(),
        year: yup.string().required('Xin hãy chọn năm').nullable(),


    };

    const schema = yup.object().shape(validationRules);
    const initialValue = {
        name: '',
        user_assign:'',
        year:'',
        ales_months: "",
        sale_months_conditions: [
           /* {
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "1months"
            },*/

        ],
        current_sale_months: "",
        current_sale_months_conditions: [
            /*{
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "1months"
            }*/
        ],
        debts_months_conditions: [
            /*{
                "number": "",
                "percentage": "",
                "points": "",
                "type": "1months"
            },*/

        ],
        sales_3_months: "",
        sale_3_months_conditions: [
           /* {
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "3months"
            },*/

        ],
        current_sale_3_months: "",
        current_sale_3_months_conditions: [
           /* {
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "3months"
            }*/
        ],
        debts_3_months_conditions: [
           /* {
                "number": "",
                "percentage": "",
                "points": "",
                "type": "3months"
            },*/

        ],
        sales_12_months: "",
        sale_12_months_conditions: [
           /* {
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "12months"
            },*/

        ],
        current_sale_12_months: "",
        current_sale_12_months_conditions: [
           /* {
                "min": "",
                "max": "",
                "percentage": "",
                "points": "",
                "type": "12months"
            }*/
        ],
        debts_12_months_conditions: [
            /*{
                "number": "",
                "percentage": "",
                "points": "",
                "type": "12months"
            },*/

        ],
        kpi_condition_staff_month: [


        ],
        kpi_condition_staff_square: [


        ],
        kpi_condition_staff_year: [


        ]

    }

    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {

        if(copyValue!==""){
            (async () => {
                setLoading(true);
                try {
                    const kpiSetUpUserRS= await kpiSetUpUserApi.get(copyValue);
                    if (kpiSetUpUserRS.status && kpiSetUpUserRS.data!= "") {

                        if (kpiSetUpUserRS.data.length !== 0) {

                            console.log('copy', kpiSetUpUserRS.data?.data);
                            setKpiSetUpUser(kpiSetUpUserRS.data?.data);
                        }
                    } else {
                        toast.error(kpiSetUpUserRS.data.message);
                        navigate('/admin/kpi-sale/setup-user');
                    }
                } catch (error) {
                    console.log('get member groups by id error', error);
                }
                setLoading(false);
            })();
        }
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const kpiSetUpUserRS= await kpiSetUpUserApi.get(id);
                if (kpiSetUpUserRS.status && kpiSetUpUserRS.data!= "") {

                    if (kpiSetUpUserRS.data.length !== 0) {
                       // kpiSetUpUserRS.data?.data.users = kpiSetUpUserRS.data?.data.users ? kpiSetUpUserRS.data?.data.users.users :  [];
                        //console.log(kpiSetUpUserRS.data?.data.users)
                        setKpiSetUpUser(kpiSetUpUserRS.data?.data);
                    }
                } else {
                    toast.error(kpiSetUpUserRS.data.message);
                    navigate('/admin/kpi-sale/setup-user');
                }
            } catch (error) {
                console.log('get member groups by id error', error);
            }
            setLoading(false);
        })();
    }, []);

    const handleFormSubmit = async (formValues) => {

        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await kpiSetUpUserApi.update(id,formValues);
            }else{
                res = await kpiSetUpUserApi.add(formValues);
            }

            if (res.status) {
                if (res.data.status) {
                    toast.success(res.data.message);
                    navigate('/admin/kpi-sale/setup-user');
                } else {
                    toast.error(res.data.message);
                }
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    }
    return (
        <WrapperPage>
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit?"Cập nhật cài đặt kpi kinh doanh":"Thêm cài đặt kpi kinh doanh"} />

            <KpiSetupUserForm initialValue={initialValue} itemValue={kpiSetUpUser} isEdit={isEdit} methods={methods} onSubmit={handleFormSubmit}  />

        </WrapperPage>
    );
}

export default KpiSetupUserAddEditPage;