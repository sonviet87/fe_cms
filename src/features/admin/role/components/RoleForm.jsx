import { yupResolver } from '@hookform/resolvers/yup';
import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import CheckboxField from 'components/FormElement/CheckboxField';




RoleForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function RoleForm({ initialValue, onSubmit, values, isEdit }) {
    const validationRules = {
        name: yup.string().required('Please enter your name'),

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
        //formValues.birthday = dayjs(formValues.birthday).format('YYYY-MM-DD');
        console.log(formValues)
        //await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', values.name);

        }
    }, [values]);
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}

        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <TextFormik name="name" label="Full name" control={control} />
                </Grid>
                <Divider />
                <Grid item xs={12} md={6} >
                    <CheckboxField name="permissions" value="1" label="Full name1" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <CheckboxField name="permissions" value="2" label="Full name2" control={control} />
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

export default RoleForm;
