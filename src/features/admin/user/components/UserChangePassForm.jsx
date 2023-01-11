import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';


UserChangePassForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function UserChangePassForm({ initialValue, onSubmit }) {
    const validationRules = {
        oldPass: yup
            .string()
            .typeError('Xin vui lòng nhập mật khẩu')
            .required('Xin vui lòng nhập mật khẩu')
            .matches(/^.{6,10}$/g, { excludeEmptyString: false, message: 'Invalid password' }),
        newPassFirst: yup.string().required('Xin vui lòng nhập mật khẩu'),
        newPassSecond: yup.string().required('Xin vui lòng nhập mật khẩu'),

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
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;

        if (formValues.password === '') {
            delete formValues.password;
        }
        await onSubmit(formValues);
    };


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
            sx={{ maxWidth: '400px' }}
        >
            <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={12}  >
                    <TextFormik name="oldPass" label="Mật khẩu cũ" control={control} />
                </Grid>
                <Grid item xs={12} >
                    <TextFormik name="newPassFirst" label="Mật khẩu mới" control={control} />
                </Grid>
                <Grid item xs={12}>
                    <TextFormik
                        type="newPassSecond"
                        name="newPassSecond"
                        label="Nhập lại mật khẩu"
                        control={control}
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

export default UserChangePassForm;
