import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {Box, Button, Divider, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";

import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import CostsFixedItem from "./CostsFixedItem";
function CostsFixedForm({ initialValue, onSubmit, itemValue, isEdit }) {
    const navigate = useNavigate();
    const users = useSelector(selectListUser);
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên '),
        year: yup.string().required('Xin hãy chọn năm '),

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
            setValue('year', itemValue.year);
            setValue('costs', itemValue.costs);
            setValue('data', itemValue.data);
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
                    <TextFormik name="name" label="Tên"  control={control} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <BasicDatePicker
                        name="year"
                        lableText="Năm"
                        control={control}
                        openTo="year"
                        views={['year']}

                    />
                </Grid>

                <Grid item xs={12} md={3} >
                    <TextFieldNumber disabled={true}  name="costs" label="Tổng" control={control} />
                </Grid>
                <Grid item xs={12}  >
                    <CostsFixedItem name="data"  control={control}/>
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
                            navigate('/admin/costs/costs-fixed');
                        }}
                    >
                        Trở lại
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CostsFixedForm;