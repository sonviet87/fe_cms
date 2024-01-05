import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiGroupMemberForm from "../components/KpiGroupMemberForm";


function KpiGroupMemberAddEditPage() {

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
    return (
        <WrapperPage>
            <TitleForm lable="Thêm thành viên nhóm" />

            <KpiGroupMemberForm initialValue={initialValue} />

        </WrapperPage>
    );
}

export default KpiGroupMemberAddEditPage;