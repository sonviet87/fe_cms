import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';


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
            .matches(/^.{6,40}$/g, { excludeEmptyString: false, message: 'Mật khẩu phải lớn hơn 6 ký tự' }),
        password: yup.string().required('Xin vui lòng nhập mật khẩu.').matches(/^.{6,30}$/g, { excludeEmptyString: false, message: 'Mật khẩu phải lớn hơn 6 ký tự' }),
        passwordConfirmation: yup.string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu không giống nhau.')

    };
    if (initialValue.email !== '') {
        validationRules.password = yup
            .string()
            .matches(/^.{6,40}$/g, { excludeEmptyString: true, message: 'Mật khẩu ít nhất 6 ký tự' });
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
        delete formValues.passwordConfirmation;
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

                    <TextFormik type="password" name="oldPass" label="Mật khẩu cũ" control={control} />
                </Grid>
                <Grid item xs={12} >
                    <TextFormik type="password" name="password" label="Mật khẩu mới" control={control} />
                </Grid>
                <Grid item xs={12}>
                    <TextFormik
                        type="password"
                        name="passwordConfirmation"
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
