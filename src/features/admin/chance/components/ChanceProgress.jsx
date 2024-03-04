import React,{useState} from 'react';
import {chanceProgress, chanceStatus} from "../constants/ChanceConstants";
import {Button} from "@mui/material";
import {useFormContext} from "react-hook-form";
import * as yup from "yup";
import chanceApi from "../../../../api/chanceAPI";
import {toast} from "react-toastify";
import {LoadingOverlay} from "../../../../components/Common/LoadingOverlay";


function ChanceProgress({status,completed}) {

    const [completedStatus, setCompletedStatus] = useState(completed);
    const methods = useFormContext();
    const [loading, setLoading] = useState(false);
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên FP'),

    }

    const handleChangeStatus = async (value) => {
        methods.trigger();
        const schema = yup.object().shape(validationRules);
        const formValue = methods.getValues();
        formValue.account_id = formValue.account_id.id;
        formValue.completed = value
        const isValid = schema.isValidSync(formValue);
        if (isValid) {
            setLoading(true);
            try {
                const res = await chanceApi.updateProgress(formValue);
                if (res.status) {
                    console.log(res.data.data.completed)
                    toast.success(res.data.message);
                    setCompletedStatus(res.data.data.completed);
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error', error.message);
                setLoading(false);
            }
        }

    }
    React.useEffect(() => {
        setCompletedStatus(completed);
    }, [completed]);

    return (
        <>
            {loading ? <LoadingOverlay /> : ''}
            {parseInt(status) === parseInt(chanceStatus.STEP_6) && (
                <> {(parseInt(completedStatus) === chanceProgress.IN_PROGRESS || parseInt(completedStatus) === chanceProgress.PROGRESS_SUCCESS) &&
                        <Button
                            color="sixth"
                            variant="contained"
                            sx={{mb: 2, mr: 1}}
                            size="small"
                            onClick={() => handleChangeStatus(chanceProgress.PROGRESS_SUCCESS)}
                        >
                            Hoàn tất dự án
                        </Button>
                    }
                    {(parseInt(completedStatus) === chanceProgress.IN_PROGRESS || parseInt(completedStatus) === chanceProgress.PROGRESS_FAILED) &&
                    <Button
                        color="fiveth"
                        variant="contained"
                        sx={{ mb: 2, mr: 1 }}
                        size="small"
                        onClick={() => handleChangeStatus(chanceProgress.PROGRESS_FAILED)}
                    >
                        Dự án thất bại
                    </Button>
                    }
                </>
            )}
        </>
    );
}

export default ChanceProgress;