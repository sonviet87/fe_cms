import { yupResolver } from '@hookform/resolvers/yup';
import {Checkbox, FormControlLabel, FormGroup, Grid} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import {useSelector} from "react-redux";
import {selectListUser} from "../userSlice";
import SelectAllTransferList from "../../../../components/Common/TransferList";




UserForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function UserForm({ initialValue, onSubmit, userValue, role, isEdit,salary,position }) {
    const [isChecked, setIsChecked] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const initialUsers = useSelector(selectListUser);
    const [users, setUsers] = useState(initialUsers);
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
        console.log(formValues)
        if (!onSubmit) return;
        //formValues.birthday = dayjs(formValues.birthday).format('YYYY-MM-DD');
        if (formValues.password === '') {
            delete formValues.password;
        }
        await onSubmit(formValues);
    };

    const handleCheckboxChange = (event) => {
        const checked = event.target.checked;
        setIsChecked(checked);

        // Nếu checkbox không được check, làm rỗng mảng users
        if (!checked) {
            setUsers([]);
        } else {
            // Nếu checkbox được check, khôi phục mảng users
            setUsers(initialUsers);
        }
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', userValue.name);
            setValue('username', userValue.username);
            setValue('password', userValue.password);
            setValue('email', userValue.email);
            setValue('role_id', userValue.role_id);
            setValue('phone', userValue.phone);
            setValue('salary_lv_id', userValue.salary_lv_id);
            setValue('position_id', userValue.position_id);
            setValue('users', userValue.users);

            if(userValue?.users?.length>0) {
                setIsChecked(true);
                setSelectedUser(userValue?.users);
            }
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
                <Grid item xs={12} md={4} >
                    <BasicSelect
                        name="role_id"
                        label="Quyền"
                        control={control}
                        options={role}

                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="phone" label="Điện thoại" control={control} />
                </Grid>
                <Grid item xs={12} md={4} >
                    <BasicSelect
                        name="salary_lv_id"
                        label="Cấp lương"
                        control={control}
                        options={salary}
                        textName="level"

                    />
                </Grid>

                <Grid item xs={12} md={4} >
                    <BasicSelect
                        name="position_id"
                        label="Chức vụ"
                        control={control}
                        options={position}

                    />
                </Grid>
                <Grid item xs={12} md={4} >

                    <FormGroup sx={{mt:1}}>
                        <FormControlLabel control={<Checkbox  name="position_id"
                                                              checked={isChecked} onChange={handleCheckboxChange}
                                                              control={control}
                                                              />} label="Quản lý" />

                    </FormGroup>
                </Grid>
                {isChecked && (
                <Grid item xs={12}>

                        <SelectAllTransferList
                            lists={users}
                            setValue={setValue}
                            seletedUser={selectedUser}
                            isEdit={true}
                            control={control}
                        />

                </Grid>
                )}


                <Grid item xs={12} md={12} textAlign="center">
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
