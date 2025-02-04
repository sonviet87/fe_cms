import React from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import {toast} from "react-toastify";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";
import kpiSettingTechnicalAPI from "../../../../api/kpiSettingTechnicalAPI";
import KpiSettingTechnicalForm from "../components/KpiSettingTechnicalForm";


function KpiSettingTechnicalEdit() {
    const [kpiSetUpUser, setKpiSetUpUser] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const validationRules = {
       name: yup.string().required('Xin hãy điền tên ').nullable(),
        user_id: yup.string().required('Xin hãy chọn 1 người dùng').nullable(),
        year: yup.string().required('Xin hãy chọn năm').nullable(),
    };

    const schema = yup.object().shape(validationRules);
    const initialValue = {
        name: '',
        user_id:'',
        year:'',
        certificate_conditions	:[],
        project_conditions: [],
        review_conditions: [],

    }

    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    React.useEffect(() => {
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const kpiSetUpUserRS= await kpiSettingTechnicalAPI.get(id);
                if (kpiSetUpUserRS.status && kpiSetUpUserRS.data!= "") {

                    if (kpiSetUpUserRS.data.length !== 0) {
                        setKpiSetUpUser(kpiSetUpUserRS.data?.data);
                    }
                } else {
                    toast.error(kpiSetUpUserRS.data.message);
                    navigate('/admin/kpi-technical/kpi-setting-technical');
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
                res = await kpiSettingTechnicalAPI.update(id,formValues);
            }else{
                res = await kpiSettingTechnicalAPI.add(formValues);
            }

            if (res.status) {
                if (res.data.status) {
                    toast.success(res.data.message);
                    navigate('/admin/kpi-technical/kpi-setting-technical');
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
            <TitleForm lable={isEdit?"Cập nhật cài đặt kpi kỹ thuật":"Thêm cài đặt kpi kỹ thuật"} />

            <KpiSettingTechnicalForm initialValue={initialValue} itemValue={kpiSetUpUser} isEdit={isEdit} methods={methods} onSubmit={handleFormSubmit}  />

        </WrapperPage>
    );
}

export default KpiSettingTechnicalEdit;