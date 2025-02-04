import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicDatePicker from 'components/FormElement/DatetimePicker';

import { useNavigate } from 'react-router-dom';
import BasicSelect from "../../../../components/FormElement/SelectBox";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";

TechnicalProjectForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function TechnicalProjectForm({ initialValue, onSubmit, itemValue, isEdit }) {
    const navigate = useNavigate();
    const users = useSelector(selectListUser);
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên dự án'),
        user_id: yup.mixed()
            .test("required", "Xin hãy chọn người dùng", (item) => {
                if (item) return true;
                return false;
            }),


    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        getValues
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
            setValue('start_date', itemValue.start_date);
            setValue('user_id', itemValue.user_id);
            setValue('points', itemValue.points);
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
                <Grid item xs={12} >
                    <TextFormik name="name" label="Tên dự án"  control={control} />
                </Grid>
                <Grid item  xs={12} md={3} >
                    <BasicSelect
                        name="user_id"
                        label="Gán cho"
                        isClear={true}
                        control={control}
                        options={
                            users
                        }

                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <BasicDatePicker
                        name="start_date"
                        lableText="Ngày bắt đầu"
                        control={control}

                        inputFormat="DD-MM-YYYY"
                    />
                </Grid>

                <Grid item xs={12} md={3} >
                    <TextFormik name="points" label="Điểm" control={control} />
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
                    <Button
                        color="fourth"
                        variant="contained"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            navigate('/admin/kpi-technical/technical-project');
                        }}
                    >
                        Trở lại
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default TechnicalProjectForm;
