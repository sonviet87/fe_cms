import React, {useState} from 'react';
import {Box, Grid, } from "@mui/material";
import * as yup from "yup";

import {yupResolver} from "@hookform/resolvers/yup";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import SelectAllTransferList from "./TransferList";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import { WrapperBox} from "../../fp/style/StyledFP";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import CustomerConditions from "./CustomerConditions";
import DebtsConditions from "./DebtsConditions";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";

function KpiGroupMemberForm({ initialValue, onSubmit, itemValue, isEdit,methods }) {

    const users = useSelector(selectListUser);
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;
    const [selectedUser, setSelectedUser] = useState([]);
    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;
        formValues.profit_months =parseFloat(formValues.profit_months?.replace(/,/g, ''));
        formValues.profit_3_months =parseFloat(formValues.profit_3_months?.replace(/,/g, ''));
        formValues.profit_12_months =parseFloat(formValues.profit_12_months?.replace(/,/g, ''));
        await onSubmit(formValues);
    }

    React.useEffect(() => {
        if (isEdit) {
            if (Object.keys(itemValue).length !== 0) {
                setSelectedUser(itemValue.users);
                reset(itemValue);
            }

        }
    }, [itemValue]);

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
            <TextFormik name="name" label="Tên nhóm" control={control}  />
            <SelectAllTransferList lists={users}  setValue={setValue} seletedUser = {selectedUser} isEdit={true} control={control} />

            <Box sx={{mt:4}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='4527a0' sx={{mb:1}}>Mục tiêu tháng</TitleBackGroundStyled>
                            <TextFieldNumber name="profit_months" label="mục tiêu Lợi nhuận" control={control} fullWidth  />
                            <div>Phần trăm tối đa</div>
                            <TextFieldNumber name="profit_months_percent" label="Phần trăm tối đa" control={control} fullWidth  />
                            <WrapperBox>
                                <div>Mục tiêu khách hàng mới</div>
                                <TextFieldNumber name="customer_months" label="mục tiêu khách hàng mới" control={control} fullWidth  />

                                <div>Điều kiện đạt khách hàng mới</div>
                                <CustomerConditions name="customer_months_conditions" control={control} type='1months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <DebtsConditions name="debts_months_conditions" control={control} type='1months' />
                            </WrapperBox>
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='28A831' sx={{mb:1}}>Mục tiêu quý</TitleBackGroundStyled>
                            <TextFieldNumber name="profit_3_months" label="mục tiêu Lợi nhuận" control={control}  fullWidth />
                            <div>Phần trăm tối đa</div>
                            <TextFieldNumber name="profit_3_months_percent" label="Phần trăm tối đa" control={control} fullWidth  />
                            <WrapperBox>
                                <div>Mục tiêu khách hàng mới</div>
                                <TextFieldNumber name="customer_3_months" label="mục tiêu khách hàng mới" control={control} fullWidth  />


                                <div>Điều kiện đạt khách hàng mới</div>
                                <CustomerConditions name="customer_3months_conditions" control={control} type='3months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <DebtsConditions name="debts_3months_conditions" control={control} type='3months' />
                            </WrapperBox>
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>Mục tiêu năm</TitleBackGroundStyled>
                            <TextFieldNumber name="profit_12_months" label="mục tiêu Lợi nhuận" control={control} fullWidth  />
                            <div>Phần trăm tối đa</div>
                            <TextFieldNumber name="profit_12_months_percent" label="Phần trăm tối đa" control={control} fullWidth  />
                            <WrapperBox>
                                <div>Mục tiêu khách hàng mới</div>
                                <TextFieldNumber name="customer_12_months" label="mục tiêu khách hàng mới" control={control} fullWidth  />

                                <div>Điều kiện đạt khách hàng mới</div>
                                <CustomerConditions name="customer_12months_conditions" control={control} type='12months' />
                            </WrapperBox>
                            <WrapperBox>

                                <div>Điều kiện đạt công nợ</div>
                                <DebtsConditions name="debts_12months_conditions" control={control} type='12months' />
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

export default KpiGroupMemberForm;