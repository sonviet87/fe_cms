import React ,{useState}from 'react';
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import TitleForm from "../../../../components/Common/TitleForm";

import ChanceSteps from "./ChanceSteps";
import ChanceProgress from "./ChanceProgress";


function ChanceHeaderPage({ isEdit, id, chance }) {

    const [status, setStatus] = useState(chance?.progress);
    React.useEffect(() => {
        //console.log(fps.status);
        setStatus(chance?.progress);
    }, [chance?.progress]);
    const handleChangeStatus = (status) => {
        setStatus(status);

    };

    return (
        <WrapperBoxAlign align="space-between" isborder={0}>
            <TitleForm lable={isEdit ? 'Cập nhật Cơ hội kinh doanh' : 'Thêm cơ hội kinh doanh '} isborder={0} />
            {isEdit && (
                <div>

                    <ChanceSteps status={status} onChangeStatus={handleChangeStatus} />
                    <ChanceProgress status={status} completed={chance?.completed} />
                </div>
            )}
        </WrapperBoxAlign>
    );
}

export default ChanceHeaderPage;