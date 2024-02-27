import React from 'react';
import {useSelector} from "react-redux";
import {selectListAccount} from "../../account/accountSlice";
import {Grid, Box, Button} from "@mui/material";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import AutoCompleteForm from "../../../../components/FormElement/Autocomplete";
import {selectListUser} from "../../user/userSlice";
import {WrapperBoxItem} from "../../fp/style/StyledFP";
import ChanceUploadfile from "./ChanceUploadfile";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";

function ChanceForm({initialValue, onSubmit,onCallContactAPi,itemValue,contactValue,isEdit,disabled, methods}) {
    const navigate = useNavigate();
    const accounts = useSelector(selectListAccount);
    const users = useSelector(selectListUser);
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        formValues.account_id = formValues.account_id.id;
        console.log(formValues)
    }
    const handleCallAPIContact = async (formValue) => {
        if (!onCallContactAPi) return;
        setValue('contact_id', '');
        await onCallContactAPi(formValue);
    };
    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextFormik name="name" disabled={disabled} label="Tên cơ hội" control={control} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <BasicSelect name="user_assign" disabled={disabled} label="Gán cho" control={control} options={users} />
                </Grid>
                <Grid item xs={12} md={2} >
                    <BasicDatePicker
                        name="startDay"
                        lableText="Ngày bắt đầu"
                        control={control}
                        sx={{ width: '100px' }}
                    />
                </Grid>
                <Grid item xs={12} md={2} sx={{mt:1}}>
                    <AutoCompleteForm
                        name="account_id"
                        label="Khách hàng"
                        control={control}
                        options={accounts}
                        onChangeAjax={handleCallAPIContact}
                        disabled={disabled}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <BasicSelect name="contact_id" label="Liên hệ" control={control} options={contactValue} disabled={disabled} />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextFieldNumber name="prices" disabled={disabled} label="Giá dự toán" control={control} />
                </Grid>

            </Grid>
            <Grid
                container
                spacing={0}
                sx={isEdit ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }}
            >
                <WrapperBoxItem>
                    <ChanceUploadfile
                        control={control}
                      setValue={setValue}
                      isEdit={isEdit}
                      itemValue={itemValue}
                      errors={errors}
                      setError={setError}
                    />
                </WrapperBoxItem>
            </Grid>
            <Grid item xs={12} md={12}>
                <WrapperBoxAlign isborder={false} align={'center'}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>
                    <Button
                        color="fourth"
                        variant="contained"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            navigate('/admin/chances');
                        }}
                    >
                        Trở lại
                    </Button>
                </WrapperBoxAlign>
            </Grid>
        </Box>
    );
}

export default ChanceForm;