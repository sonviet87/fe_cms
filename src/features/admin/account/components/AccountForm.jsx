import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicSelect from "components/FormElement/SelectBox";




AccountForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function AccountForm({ initialValue, onSubmit, itemValue, usersValue, isEdit }) {
    const validationRules = {
        name: yup.string().required('Tên không được bỏ trống'),
        phone: yup.string().required('Điện thoại không được bỏ trống'),
        user_id: yup.string().required('user không được bỏ trống'),
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
            setValue('name', itemValue.name);
            setValue('phone', itemValue.phone);
            setValue('address', itemValue.address);
            setValue('legal_name', itemValue.legal_name);
            setValue('email', itemValue.email);
            setValue('industry', itemValue.industry);
            setValue('mst', itemValue.mst);
            setValue('deposit', itemValue.deposit);
            setValue('debt', itemValue.debt);
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
                    <TextFormik name="name" label="Tên" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="phone" label="Điện thoại" control={control} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextFormik name="address" label="Đia chỉ" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextFormik name="legal_name" label="Tên viết tắt" control={control} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextFormik name="industry" label="Ngành" control={control} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextFormik name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="mst" label="MST" control={control} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicSelect
                        name="deposit"
                        label="Phần trăm cọc"
                        control={control}
                        options={
                            [
                                { id: 0, name: "0%" },
                                { id: 10, name: "10%" },
                                { id: 20, name: "20%" },
                                { id: 30, name: "30%" },
                                { id: 40, name: "40%" },
                                { id: 50, name: "50%" },
                                { id: 60, name: "60%" },
                                { id: 70, name: "70%" },
                                { id: 80, name: "80%" },
                                { id: 90, name: "90%" },
                                { id: 100, name: "100%" },
                            ]
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="debt" label="Số ngày công nợ" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="user_id"
                        label="Gán cho"
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

export default AccountForm;
