import React, {useState} from 'react';
import {Box, Button, Grid,} from "@mui/material";
import {useFieldArray} from "react-hook-form";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import { WrapperBox} from "../../fp/style/StyledFP";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import KpiConditionsDebts from "./KpiConditionsDebts";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import KpiConditionsSale from "./KpiConditionsSale";
import StaffForm from "./StaffForm";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import {useSearchParams} from "react-router-dom";

function KpiSetupUserForm({ initialValue, onSubmit, itemValue, isEdit,methods }) {
    const [searchParams] = useSearchParams();
    const copyValue = searchParams.get("copy") || "";
    const users = useSelector(selectListUser);
    const [selectedUser, setSelectedUser] = useState([]);
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;

    const handleChangeUser = (id) =>{
        const user = users.find((u) => u.id === id);
        if (user) {
            setSelectedUser(user.users);
        } else {
            setSelectedUser([]);
        }
    }
    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;
        const formattedValues = removeFormattingFromObject(formValues);

        await onSubmit(formattedValues);
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
        if (isEdit || copyValue !== "") {

            if (Object.keys(itemValue).length !== 0) {
                setSelectedUser(itemValue.users);
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
                    <BasicSelect name="user_assign" label="Gán cho" onChangeAjax={handleChangeUser} control={control} options={users} />
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
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='4527a0' sx={{mb:1}}>Mục tiêu tháng</TitleBackGroundStyled>
                            <WrapperBox>
                                <div>Mục tiêu doanh thu</div>
                                <TextFieldNumber name="sales_months" label="Mục tiêu doanh thu" control={control} fullWidth  />
                                <KpiConditionsSale name="sale_months_conditions" control={control} type='1months' />
                            </WrapperBox>
                            <WrapperBox>
                                <div>Quản lý nhân viên</div>
                                <StaffForm methods={methods} users={selectedUser} name={"kpi_condition_staff_month"} type="1months" />


                            </WrapperBox>
                            <WrapperBox>
                                <div>Mục tiêu doanh số hiện hữu</div>
                                <TextFieldNumber name="current_sale_months" label="mục tiêu doanh số hiện hữu" control={control} fullWidth  />
                                 <KpiConditionsSale name="current_sale_months_conditions" control={control} type='1months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <KpiConditionsDebts name="debts_months_conditions" control={control} type='1months' />
                            </WrapperBox>
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='28A831' sx={{mb:1}}>Mục tiêu quý</TitleBackGroundStyled>
                            <WrapperBox>
                                <div>Mục tiêu doanh thu</div>
                                <TextFieldNumber name="sales_3_months" label="Mục tiêu doanh thu" control={control} fullWidth  />
                                <KpiConditionsSale name="sale_3_months_conditions" control={control} type='3months' />
                            </WrapperBox>

                            <WrapperBox>
                                <div>Quản lý nhân viên</div>

                                <StaffForm methods={methods} users={selectedUser} name={"kpi_condition_staff_square"} type="3months" />
                            </WrapperBox>
                            <WrapperBox>
                                <div>Mục tiêu doanh số hiện hữu</div>
                                <TextFieldNumber name="current_sale_3_months" label="mục tiêu doanh số hiện hữu" control={control} fullWidth  />
                                <KpiConditionsSale name="current_sale_3_months_conditions" control={control} type='3months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <KpiConditionsDebts name="debts_3_months_conditions" control={control} type='3months' />
                            </WrapperBox>
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>Mục tiêu năm</TitleBackGroundStyled>
                            <WrapperBox>
                                <div>Mục tiêu doanh thu</div>
                                <TextFieldNumber name="sales_12_months" label="Mục tiêu doanh thu" control={control} fullWidth  />
                                <KpiConditionsSale name="sale_12_months_conditions" control={control} type='12months' />
                            </WrapperBox>

                            <WrapperBox>
                                <div>Quản lý nhân viên</div>

                                <StaffForm methods={methods} users={selectedUser} name={"kpi_condition_staff_year"} type='12months' />
                            </WrapperBox>
                            <WrapperBox>
                                <div>Mục tiêu doanh số hiện hữu</div>
                                <TextFieldNumber name="current_sale_12_months" label="mục tiêu doanh số hiện hữu" control={control} fullWidth  />
                                <KpiConditionsSale name="current_sale_12_months_conditions" control={control} type='12months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <KpiConditionsDebts name="debts_12_months_conditions" control={control} type='12months' />
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

export default KpiSetupUserForm;