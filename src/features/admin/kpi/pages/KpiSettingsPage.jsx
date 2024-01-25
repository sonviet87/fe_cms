import React from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import KpiSettingsForm from "../components/KpiSettingsForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";
import {toast} from "react-toastify";
import kpiSettingsAPI from "../../../../api/kpiSettingsAPI";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";



const KpiSettingsPage = () => {

    const [loading, setLoading] = React.useState(false);
    const [kpiSettings, setKpiSettings] = React.useState({});
    const id = 1;
    const initialValue = {
        months: [
            {
                max_percentage:'',
                min_percentage:'',
                percentage: '',
                type: '1months'
            }
        ],
        months3:[
            {
                max_percentage:'',
                min_percentage:'',
                percentage: '',
                type: '3months'
            }
        ],
        months12: [
            {
                max_percentage:'',
                min_percentage:'',
                percentage: '',
                type: '12months'
            }
        ],

    }
    const validationRules = {

    };

    const schema = yup.object().shape(validationRules);
    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });
    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {

            const res = await kpiSettingsAPI.update(id,formValues);

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
                const kpiGroupRs = await kpiSettingsAPI.getList();
                if (kpiGroupRs.status && kpiGroupRs.data!= "") {
                    if (kpiGroupRs.data.length !== 0) {
                        const resultObject = {};

                        kpiGroupRs.data.data.forEach(item => {
                            const targetType = item.type;

                            if (!resultObject[targetType]) {
                                resultObject[targetType] = [];
                            }

                            resultObject[targetType].push({
                                id: item.id,
                                min_percentage: item.min_percentage,
                                max_percentage: item.max_percentage,
                                percentage: item.percentage,
                                type: item.type
                            });
                        });
                        setKpiSettings(resultObject);
                    }
                } else {
                    toast.error(kpiGroupRs.message);
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

export default KpiSettingsPage;