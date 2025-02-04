import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import KpiSettingsForm from "../components/KpiSettingsForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import {toast} from "react-toastify";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";
import kpiSettingsTotalAPI from "../../../../api/kpiSettingsTotalAPI";


const KpiSettingsTotalPage = () => {

    const [loading, setLoading] = React.useState(false);
    const [kpiSettings, setKpiSettings] = React.useState({});
    const id = 1;
    const initialValue = {
        "sale": {
            "1months": [

            ],
            "3months":[

            ],
            "12months": [

            ],
        },
        "technical":{},
        "buy_goods":{},
        "company":{}


    }
    const validationRules = {

    };

    const schema = yup.object().shape(validationRules);
    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (formValues) => {
        formValues.kpi_company	= parseFloat(formValues.kpi_company	?.replace(/,/g, ''));
        setLoading(true);
        try {

            const res = await kpiSettingsTotalAPI.update(id,formValues);

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
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const kpiGroupRs = await kpiSettingsTotalAPI.getList();
                if (kpiGroupRs.status && kpiGroupRs.data!= "") {
                    if (kpiGroupRs.data.length !== 0) {

                        const resultObject = kpiGroupRs.data.data;
                        resultObject.kpi_company = kpiGroupRs.data.kpi_company;

                        console.log(resultObject)
                        setKpiSettings(resultObject);
                    }
                } else {
                    toast.error(kpiGroupRs?.message);
                }
            } catch (error) {
                console.log('get kpi settings error', error);
            }
            setLoading(false);
        })();
    }, []);
    return (
        <WrapperPage>
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable="Cài đặt KPI tổng" />
            <KpiSettingsForm initialValue={initialValue} itemValue={kpiSettings} onSubmit={handleFormSubmit} methods={methods} />
        </WrapperPage>
    )
}

export default KpiSettingsTotalPage;