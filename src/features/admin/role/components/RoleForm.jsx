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
import MutilCheckBox from 'components/FormElement/MutilCheckbox';




RoleForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function RoleForm({ initialValue, permissions, onSubmit, values, isEdit }) {
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
        await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', values.name);
            setValue('permissions', values.permissions?.flatMap(x => x.id.toString()))
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
                    <TextFormik name="name" label="Tên" control={control} />
                </Grid>

            </Grid>
            <Divider sx={{ mt: 2 }} />
            <Grid container spacing={2}>

                {/* {
                    permissions.length > 0 && permissions.map((item) => {
                        return <Grid item xs={2} key={item.id}><CheckboxField name="permissions" value={item.id} isArray label={item.name} control={control} /></Grid>
                    })
                } */}


                {<MutilCheckBox name="permissions" options={permissions} control={control} />}



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
