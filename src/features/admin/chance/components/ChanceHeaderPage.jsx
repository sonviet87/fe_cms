import React ,{useState}from 'react';
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";

import ChanceSteps from "./ChanceSteps";


function ChanceHeaderPage({ isEdit, id, chance }) {
    const [status, setStatus] = useState(chance?.status);
    React.useEffect(() => {
        //console.log(fps.status);
        setStatus(chance?.status);
    }, [chance?.status]);
    const handleChangeStatus = (status) => {
        setStatus(status);

    };
    return (
        <WrapperBoxAlign align="space-between" isborder={0}>
            <TitleForm lable={isEdit ? 'Cập nhật Cơ hội kinh doanh' : 'Thêm cơ hội kinh doanh '} isborder={0} />
            {isEdit && (
                <div>

                    <ChanceSteps status={status} onChangeStatus={handleChangeStatus} />

                </div>
            )}
        </WrapperBoxAlign>
    );
}

export default ChanceHeaderPage;