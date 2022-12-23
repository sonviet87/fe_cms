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



DebtForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function DebtForm({ initialValue, onSubmit, itemValue, isEdit }) {
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

            setValue('industry', itemValue.industry);


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

export default DebtForm;