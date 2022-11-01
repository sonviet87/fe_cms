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



AccountForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function AccountForm({ initialValue, onSubmit, itemValue, role, isEdit }) {
    const validationRules = {
        name: yup.string().required('Please enter your name'),
        phone: yup.string().required('Please enter phone'),

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
            setValue('legal_address', itemValue.legal_address);
            setValue('industry', itemValue.industry);
            setValue('district', itemValue.district);
            setValue('city', itemValue.city);

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
                    <TextFormik name="legal_name" label="Tên pháp lý" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="legal_address" label="Địa chỉ pháp lý" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="industry" label="Ngành" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="district" label="Quận" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="city" label="Thành phố" control={control} />
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

export default AccountForm;
