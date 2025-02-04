import React from 'react';
import {Box, Grid,} from "@mui/material";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import { WrapperBox} from "../../fp/style/StyledFP";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import KpiConditionsSupplier from "./KpiConditionsSupplier";
import KpiConditionsTechnical from "../../kpiTechnical/components/KpiConditionsTechnical";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";


function KpiSettingSupplierForm({ initialValue, onSubmit, itemValue, isEdit,methods }) {

    const users = useSelector(selectListUser);
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;

    const handleFormSubmit = async (formValues) => {
        console.log(formValues)
        if (!onSubmit) return;
        //const formattedValues = removeFormattingFromObject(formValues);

        await onSubmit(formValues);
    }
    const removeFormattingFromObject = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(removeFormattingFromObject);
        } else if (typeof obj === "object" && obj !== null) {
            return Object.fromEntries(
                Object.entries(obj).map(([key, value]) => [key, removeFormattingFromObject(value)])
            );
        } else if (typeof obj === "string" && /^[\d,]+$/.test(obj)) {

            return parseFloat(obj.replace(/,/g, ""));
        }
        return obj;
    };



    React.useEffect(() => {
        if (isEdit) {
            console.log(itemValue)
            if (Object.keys(itemValue).length !== 0) {

                reset(itemValue);
            }
        }
    }, [itemValue]);

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextFormik name="name" label="Tên" control={control}  />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicSelect name="user_id" label="Gán cho" control={control} options={users} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicDatePicker
                        name="year"
                        lableText="Năm"
                        control={control}
                        openTo="year"
                        views={['year']}
                    />
                </Grid>
            </Grid>


            <Box sx={{mt:4}}>
                <Grid container spacing={2}>

                    <Grid item xs={8}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>Mục tiêu năm</TitleBackGroundStyled>
                            <WrapperBox>
                                <div>Nhà cung cấp mới</div>
                                <TextFieldNumber name="new_supplier_target" label="Mục tiêu NCC mới " control={control} fullWidth  />
                                <KpiConditionsSupplier name="new_supplier_conditions" control={control} type='12months' labelText="NCC mới" />
                            </WrapperBox>

                            <WrapperBox>
                                <div>Nhà cung cấp cũ tăng công nợ</div>
                                <TextFieldNumber name="old_supplier_target" label="Mục tiêu NCC mới " control={control} fullWidth  />
                                <KpiConditionsTechnical name="old_supplier_conditions" control={control} type='12months' labelText="NCC" />

                            </WrapperBox>

                        </WrapperBox>
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12} md={12} sx={{mt:4}}>
                <WrapperBoxAlign isborder={false} align={'center'}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>

                </WrapperBoxAlign>
            </Grid>
        </Box>
    );

}

export default KpiSettingSupplierForm;