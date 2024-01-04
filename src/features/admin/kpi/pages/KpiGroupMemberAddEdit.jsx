import TitleForm from "../../../../components/Common/TitleForm";
import {WrapperPage} from "../../../../components/Common/SlytedComponent/Wrapper";
import KpiGroupMemberForm from "../components/KpiGroupMemberForm";


function KpiGroupMemberAddEditPage() {

    return (
        <WrapperPage>
            <TitleForm lable="Thêm thành viên nhóm" />

            <KpiGroupMemberForm />

        </WrapperPage>
    );
}

export default KpiGroupMemberAddEditPage;