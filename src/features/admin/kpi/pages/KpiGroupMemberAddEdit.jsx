import React from 'react';
import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiGroupMemberForm from "../components/KpiGroupMemberForm";
import KpiMemberGroupsAPI from "../../../../api/kpiMemberGroupsAPI";
import {toast} from "react-toastify";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import kpiMemberGroupsApi from "../../../../api/kpiMemberGroupsAPI";
import {useNavigate} from "react-router-dom";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";


function KpiGroupMemberAddEditPage() {
    const [kpiMemberGroups, setKpiMemberGroups] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const validationRules = {

    };

    const schema = yup.object().shape(validationRules);
    const initialValue = {
        name: '',
        users: [],
        profit_months:'',
        profit_3_months	:'',
        profit_12_months	:'',
        customer_months	:'',
        customer_3_months	:'',
        customer_12_months	:'',
        debts_months	:'',
        debts_3_months	:'',
        debts_12_months	:'',
        customer_months_conditions: [
            {
                number:'',
                percentage : '',
                type : 'months'
            }
        ],
        customer_3months_conditions: [
            {
                number:'',
                percentage : '',
                type : '3months'
            }
        ],
        customer_12months_conditions: [
            {
                number:'',
                percentage : '',
                type : '12months'
            }
        ],
        debts_months_conditions: [
            {
                min_days:'',
                max_days: '',
                percentage : '',
                type : 'months'
            }
        ],
        debts_3months_conditions: [
            {
                min_days:'',
                max_days: '',
                percentage : '',
                type : '3months'
            }
        ],
        debts_12months_conditions: [
            {
                min_days:'',
                max_days: '',
                percentage : '',
                type : '12months'
            }
        ]
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
                const kpiGroupRs = await KpiMemberGroupsAPI.get(id);
                if (kpiGroupRs.status && kpiGroupRs.data!= "") {
                    if (kpiGroupRs.data.length !== 0) {
                        setKpiMemberGroups(kpiGroupRs.data);
                    }
                } else {
                    toast.error(kpiGroupRs.data.message);
                    //navigate('/admin/kpi/group-member');
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
                res = await kpiMemberGroupsApi.update(id,formValues);
            }else{
                res = await kpiMemberGroupsApi.add(formValues);
            }


            if (res.status) {
                if (res.data.status) {
                    toast.success(res.data.message);
                    navigate('/admin/kpi/group-member');
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
            <TitleForm lable={isEdit?"Cập nhật nhóm thành viên":"Thêm nhóm thành viên "} />

            <KpiGroupMemberForm initialValue={initialValue} itemValue={kpiMemberGroups} isEdit={isEdit}  methods={methods} onSubmit={handleFormSubmit} />

        </WrapperPage>
    );
}

export default KpiGroupMemberAddEditPage;