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



UserForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function UserForm({ initialValue, onSubmit, userValue, isEdit }) {
    console.log('isEdit', isEdit)
    const validationRules = {
        name: yup.string().required('Please enter your name'),
        password: yup
            .string()
            .typeError('Please enter your password')
            .required('Please enter your password')
            .matches(/^.{6,10}$/g, { excludeEmptyString: false, message: 'Invalid password' }),
        email: yup.string().email('Please enter valid email').required('Please enter email'),
        phone: yup.string().required('Please enter phone'),

    };
    if (initialValue.email !== '') {
        validationRules.password = yup
            .string()
            .matches(/^.{6,10}$/g, { excludeEmptyString: true, message: 'Invalid password' });
    }
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
        if (formValues.password === '') {
            delete formValues.password;
        }
        await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', userValue.name);
            setValue('username', userValue.username);
            setValue('password', userValue.password);
            setValue('email', userValue.email);
            setValue('role_id', userValue.role_id);
            setValue('phone', userValue.phone);
        }
    }, [userValue]);
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
                <Grid item xs={12} md={6}>
                    <TextFormik name="username" label="Username" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik
                        type="password"
                        name="password"
                        label="Password"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BasicSelect
                        name="role_id"
                        label="Role"
                        control={control}
                        options={[
                            { label: 'Admin', value: 1 },
                            { label: 'Vendor', value: 2 },
                            { label: 'Buyer', value: 3 },
                        ]}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="phone" label="Phone" control={control} />
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

export default UserForm;
