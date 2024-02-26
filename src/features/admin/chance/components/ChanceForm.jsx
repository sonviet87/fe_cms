import React from 'react';
import {useSelector} from "react-redux";
import {selectListAccount} from "../../account/accountSlice";
import {Grid,Box} from "@mui/material";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import AutoCompleteForm from "../../../../components/FormElement/Autocomplete";
import {selectListUser} from "../../user/userSlice";

function ChanceForm({initialValue, onSubmit,onCallContactAPi,itemValue,contactValue,isEdit,disabled, methods}) {
    const accounts = useSelector(selectListAccount);
    const users = useSelector(selectListUser);
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
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
                <Grid item xs={12} md={3}>
                    <BasicSelect name="user_assign" disabled={disabled} label="Gán cho" control={control} options={users} />
                </Grid>
                <Grid item xs={12} md={3} sx={{mt:1}}>
                    <AutoCompleteForm
                        name="account_id"
                        label="Khách hàng"
                        control={control}
                        options={accounts}
                        onChangeAjax={handleCallAPIContact}
                        disabled={disabled}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <BasicSelect name="contact_id" label="Liên hệ" control={control} options={contactValue} disabled={disabled} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextFieldNumber name="prices" disabled={disabled} label="Giá dự toán" control={control} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ChanceForm;