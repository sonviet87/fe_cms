
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import TextFormik from 'components/FormElement/TextFormik';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormLogin } from '../styles/StyledLogin';
LoginForm.propTypes = {
    onSubmit: PropTypes.func,
};



function LoginForm({ onSubmit }) {

    const schema = yup.object().shape({
        username: yup.string().required('ID không được để trống'),
        password: yup.string().required('Mật khẩu không được trống'),
    });
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;
        await onSubmit(formValues);
    };

    return (
        <FormLogin
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <div>
                <label className="lbl-login">ID</label>
                <TextFormik
                    control={control}
                    margin="normal"
                    required

                    id="username"
                    label="Tài khoản"
                    name="username"
                    autoComplete="username"
                    autoFocus />

                <label className="lbl-login">Mật khẩu</label>
                <TextFormik control={control}
                    margin="normal"
                    required

                    name="password"
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Box >

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng nhập
                    </Button>
                </Box>
            </div>

        </FormLogin>
    );
}

export default LoginForm;