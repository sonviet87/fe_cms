import React from 'react';
import {Box, Grid} from "@mui/material";
import {WrapperBox} from "../../fp/style/StyledFP";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import SettingConditions from "./SettingsConditions";

function KpiSettingsForm({ initialValue, onSubmit, itemValue,methods }) {
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
       await onSubmit(formValues);
    }
    React.useEffect(() => {
            if (Object.keys(itemValue).length !== 0) {
                reset(itemValue);
            }

    }, [itemValue]);

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>

            <Box sx={{mt:4}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='4527a0' sx={{mb:1}}>KPI tháng</TitleBackGroundStyled>
                                <SettingConditions name="1months" control={control} type='1months' />
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='28A831' sx={{mb:1}}>KPI quý</TitleBackGroundStyled>
                                <SettingConditions name="3months" control={control} type='3months' />
                        </WrapperBox>
                    </Grid>
                    <Grid item xs={4}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>KPI năm</TitleBackGroundStyled>
                                 <SettingConditions name="12months" control={control} type='12months' />
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

export default KpiSettingsForm;