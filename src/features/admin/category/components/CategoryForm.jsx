import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik, { TextFieldNumber } from 'components/FormElement/TextFormik';

CategoryForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};

function CategoryForm({ initialValue, onSubmit, itemValue, isEdit }) {
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên sản phẩm'),
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
            setValue('descriptions', itemValue.descriptions);
            setValue('tax_percent', itemValue.tax_percent);

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
                    <TextFormik name="name" label="Tên sản phẩm" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFieldNumber name="tax_percent" suffix={'%'} label="VAT" control={control} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextFormik name="descriptions" label="Mô tả sản phẩm" control={control} multiline={true} rows={8} />
                </Grid>

                <Grid item xs={12} md={6}>
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

export default CategoryForm;
