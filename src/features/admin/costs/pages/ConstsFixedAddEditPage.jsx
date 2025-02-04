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

import CostsFixedForm from "../components/CostsFixedForm";
import costsFixedAPI from "../../../../api/costsFixed";


function ConstsFixedAddEditPage() {
    const [kpiSetUpUser, setKpiSetUpUser] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const validationRules = {
       name: yup.string().required('Xin hãy điền tên ').nullable(),
        user_id: yup.string().required('Xin hãy chọn 1 người dùng').nullable(),
    };

    const schema = yup.object().shape(validationRules);
    const initialValue = {
        name: '',
        year: '',
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
                const kpiSetUpUserRS= await costsFixedAPI.get(id);
                if (kpiSetUpUserRS.status && kpiSetUpUserRS.data!= "") {

                    if (kpiSetUpUserRS.data.length !== 0) {
                        setKpiSetUpUser(kpiSetUpUserRS.data?.data);
                    }
                } else {
                    toast.error(kpiSetUpUserRS.data.message);
                    navigate('/admin/costs/costs-fixed');
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
                res = await costsFixedAPI.update(id,formValues);
            }else{
                res = await costsFixedAPI.add(formValues);
            }

            if (res.status) {
                if (res.data.status) {
                    toast.success(res.data.message);
                    navigate('/admin/costs/costs-fixed');
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
            <TitleForm lable={isEdit?"Cập nhật giá cố định":"Thêm giá cố định"} />

            <CostsFixedForm initialValue={initialValue} itemValue={kpiSetUpUser} isEdit={isEdit} methods={methods} onSubmit={handleFormSubmit}  />

        </WrapperPage>
    );
}

export default ConstsFixedAddEditPage;