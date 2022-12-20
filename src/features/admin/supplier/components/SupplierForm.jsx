import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';

SupplierForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};

function SupplierForm({ initialValue, onSubmit, itemValue, isEdit, usersValue }) {
    const validationRules = {
        company: yup.string().required('Xin hãy điền thông tin công ty'),
    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('company', itemValue.company);
            setValue('account', itemValue.account);
            setValue('address', itemValue.address);
            setValue('email', itemValue.email);
            setValue('mst', itemValue.mst);
            setValue('phone', itemValue.phone);
            setValue('user_id', itemValue.user_id);
        }
    }, [itemValue]);

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}

        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <TextFormik name="company" label="Công ty" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="account" label="Tài khoản" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="address" label="Địa chỉ" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="mst" label="Mã số thuế" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextFormik name="phone" label="Điện thoại" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="email" label="email" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="user_id"
                        label="Sale phụ trách"
                        control={control}
                        options={usersValue}

                    />
                </Grid>


                <Grid item xs={12} md={12}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SupplierForm;
