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


function UserForm({ initialValue, onSubmit, userValue, role, isEdit,salary }) {
    const validationRules = {
        name: yup.string().required('Xin vui lòng nhập tên'),
        password: yup
            .string()
            .typeError('Xin vui lòng nhập mật khẩu')
            .required('Xin vui lòng nhập mật khẩu')
            .matches(/^.{6,40}$/g, { excludeEmptyString: false, message: 'Mật khẩu ít nhất 6 ký tự' }),
        email: yup.string().email('Không đúng định dạng email').required('Xin hãy điền email'),
        phone: yup.string().required('Xin điền số điện thoại'),
        salary_lv_id: yup.string().nullable().required('Xin chọn cấp lương'),

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
            console.log(userValue)
            setValue('name', userValue.name);
            setValue('username', userValue.username);
            setValue('password', userValue.password);
            setValue('email', userValue.email);
            setValue('role_id', userValue.role_id);
            setValue('phone', userValue.phone);
            setValue('salary_lv_id', userValue.salary_lv_id);
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
                    <TextFormik name="name" label="Họ và tên" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="username" label="Tên đăng nhập" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik
                        type="password"
                        name="password"
                        label="Mật khẩu"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="email" label="Email" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="role_id"
                        label="Quyền"
                        control={control}
                        options={role}

                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextFormik name="phone" label="Điện thoại" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="salary_lv_id"
                        label="Cấp lương"
                        control={control}
                        options={salary}
                        textName="level"

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

export default UserForm;
