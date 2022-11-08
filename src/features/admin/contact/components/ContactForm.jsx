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



ContactForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function ContactForm({ initialValue, onSubmit, itemValue, usersValue, accountsValue, isEdit }) {
    const validationRules = {
        name: yup.string().required('Xin điền họ tên'),
        user_id: yup.string().required('Xin chọn người gán'),
        account_id: yup.string().required('Xin chọn tài khoản'),
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
            setValue('email', itemValue.email);
            setValue('user_id', itemValue.user_id);
            setValue('account_id', itemValue.account_id);

        }
    }, [itemValue]);

    console.log('itemValue', itemValue)

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
                    <TextFormik name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="user_id"
                        label="Gán cho"
                        control={control}
                        options={usersValue}

                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="account_id"
                        label="Tài khoản"
                        control={control}
                        options={accountsValue}

                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Save Changes
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ContactForm;
