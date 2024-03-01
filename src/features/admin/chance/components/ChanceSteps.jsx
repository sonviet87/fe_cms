import React from 'react';
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";
import {Button} from "@mui/material";
import * as yup from "yup";
import {toast} from "react-toastify";
import {useFormContext} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import chanceApi from "../../../../api/chanceAPI";
import {chanceStatus} from "../constants/ChanceConstants";


function ChanceSteps({ status, onChangeStatus }) {
    const [loading, setLoading] = React.useState(false);

    const methods = useFormContext();
    const navigate = useNavigate();
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên FP'),
        contact_id: yup.string().required('Xin hãy chọn liên hệ'),
        account_id: yup.string().required('Xin hãy chọn tài khoản'),
        user_assign: yup.string().required('Xin hãy chọn người dùng'),
    }
    const handleChangeStatus = async (value) => {
        methods.trigger();
        const schema = yup.object().shape(validationRules);
        const formValue = methods.getValues();
        formValue.account_id = formValue.account_id.id;
        formValue.status = value
        const isValid = schema.isValidSync(formValue);
        if (isValid) {
            setLoading(true);
            try {
                const res = await chanceApi.updateStatus(formValue);
                if (res.status) {
                    toast.success(res.data.message);
                    if (parseInt(value) === 2) {
                        navigate('/admin/chances');
                    }
                    onChangeStatus(value);
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error', error.message);
                setLoading(false);
            }
        }

    }
    return (
        <>
        {loading ? <LoadingOverlay /> : ''}
            {parseInt(status) === parseInt(chanceStatus.STEP_1) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceStatus.STEP_2)}
                    >
                        Cà phê & ăn Trưa
                    </Button>
                </>
            )}
            {parseInt(status) === parseInt(chanceStatus.STEP_2) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceStatus.STEP_3)}
                    >
                        Tư vấn giải pháp
                    </Button>
                </>
            )}
            {parseInt(status) === parseInt(chanceStatus.STEP_3) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceStatus.STEP_4)}
                    >
                        Báo giá
                    </Button>
                </>
            )}
            {parseInt(status) === parseInt(chanceStatus.STEP_4) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceStatus.STEP_5)}
                    >
                        Thương Lượng giá
                    </Button>
                </>
            )}
            {parseInt(status) === parseInt(chanceStatus.STEP_5) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceStatus.STEP_6)}
                    >
                        Thương thảo hợp đồng
                    </Button>
                </>
            )}
            {parseInt(status) === parseInt(chanceStatus.STEP_6) && (
                <>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"

                    >
                        Ký hợp đồng
                    </Button>
                </>
            )}
        </>
    );
}

export default ChanceSteps;