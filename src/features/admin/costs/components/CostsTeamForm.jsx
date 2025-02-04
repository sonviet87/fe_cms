import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom'
import {Box, Button, Divider, Grid} from "@mui/material";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import TextFormik, {TextFieldNumber, TextFieldNumberSmall} from "../../../../components/FormElement/TextFormik";

import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import LoadingButton from "@mui/lab/LoadingButton";

import CostsTeamItem from "./CostsTeamItem";
function CostsTeamForm({ initialValue, onSubmit, itemValue, isEdit }) {
    const navigate = useNavigate();
    const users = useSelector(selectListUser);
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên '),
        year: yup.string().required('Xin hãy chọn năm '),
        data: yup.lazy(() =>
            yup.array().of(
                yup.object({
                    user_id: yup.mixed()
                        .test("required", "Xin hãy chọn người dùng", (item) => {
                            if (item) return true;
                            return false;
                        }),
                    salary_12: yup.string().required('Lương không được trống ').nullable(),
                    insurance :yup.string().required('Bảo hiểm không được trống ').nullable(),
                    travel: yup.string().required('Bảo hiểm không được trống ').nullable(),
                    monthly_bonus: yup.string().required('Thưởng tháng không được trống ').nullable(),
                    quarterly_bonus: yup.string().required('Thưởng quý không được trống ').nullable(),
                    year_bonus: yup.string().required('Thưởng năm không được trống ').nullable(),
                    proportion: yup.string().required('Tỷ lệ không được trống ').nullable(),
                    sale: yup.string().required('Doánh thu không được trống ').nullable(),
                    human_cost: yup.string().required('chi phí không được trống ').nullable(),
                }),
            ),
        ),

    };

    const schema = yup.object().shape(validationRules);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        getValues,
        watch
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const percent = watch('percent', 0)
    const costs_fixed = watch('costs_fixed', 0)
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        formValues.costs_fixed = formValues.costs_fixed.toString().replace(/,/g, '');
        await onSubmit(formValues);
    };

    React.useEffect(() => {
        if (isEdit) {

            setValue('name', itemValue.name);
            setValue('year', itemValue.year);
            setValue('costs_fixed', itemValue.costs_fixed);
            setValue('data', itemValue.data);
            setValue('percent', itemValue.percent);
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
                <Grid item xs={12} md={2} >
                    <TextFieldNumber   name="percent" label="Phần trăm" control={control} />
                </Grid>
                <Grid item xs={12} md={2} >
                    <TextFieldNumber   name="costs_fixed" label="Chi phí chung" control={control} />
                </Grid>


                <Grid item xs={12}  >
                    <CostsTeamItem name="data"  control={control} getValues={getValues} setValue={setValue} percent={percent} costs_fixed={costs_fixed}/>
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
                            navigate('/admin/costs/costs-team/');
                        }}
                    >
                        Trở lại
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CostsTeamForm;