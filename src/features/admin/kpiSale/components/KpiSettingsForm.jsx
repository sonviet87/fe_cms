import React from 'react';
import {Box, Grid, Tab, Tabs} from "@mui/material";
import { WrapperBox} from "../../fp/style/StyledFP";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import SettingConditions from "./SettingsConditions";
import {TextFieldNumber} from "../../../../components/FormElement";
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}
function KpiSettingsForm({ initialValue, onSubmit, itemValue,methods }) {
    const { control, reset, getValues, setValue, handleSubmit } = methods;
    const { setError, errors, isSubmitting } = methods.formState;

    const [valueTab, setValueTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
    };
    const handleFormSubmit = async (formValues) => {
        console.log(formValues)
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Kpi Sale" {...a11yProps(0)} />
                    <Tab label="Kpi Kỹ thuật" {...a11yProps(1)} />
                    <Tab label="Kpi mua hàng" {...a11yProps(2)} />
                    <Tab label="Kpi công ty" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={valueTab} index={0}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <WrapperBox>
                                <TitleBackGroundStyled background='4527a0' sx={{mb:1}}>KPI tháng</TitleBackGroundStyled>
                                <SettingConditions name="sale.1months" control={control} type='1months' />
                            </WrapperBox>
                        </Grid>
                        <Grid item xs={12}>
                            <WrapperBox>
                                <TitleBackGroundStyled background='28A831' sx={{mb:1}}>KPI quý</TitleBackGroundStyled>
                                <SettingConditions name="sale.3months" control={control} type='3months' />
                            </WrapperBox>
                        </Grid>
                        <Grid item xs={12}>
                            <WrapperBox>
                                <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>KPI năm</TitleBackGroundStyled>
                                <SettingConditions name="sale.12months" control={control} type='12months' />
                            </WrapperBox>
                        </Grid>
                    </Grid>

            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>KPI năm</TitleBackGroundStyled>
                            <SettingConditions name="technical.12months" control={control} type='12months' type_kpi='technical' />
                        </WrapperBox>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>KPI năm</TitleBackGroundStyled>
                            <SettingConditions name="buy_goods.12months" control={control} type='12months' type_kpi='buy_goods' />
                        </WrapperBox>
                    </Grid>
                </Grid>
            </CustomTabPanel>
            <CustomTabPanel value={valueTab} index={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> <TextFieldNumber name={'kpi_company'}  label="Doanh số cty" control={control} /></Grid>
                    <Grid item xs={12}>
                        <WrapperBox>
                            <TitleBackGroundStyled background='b8bb0d' sx={{mb:1}}>KPI năm</TitleBackGroundStyled>
                            <SettingConditions name="company.12months" control={control} type='12months' type_kpi='company' />
                        </WrapperBox>
                    </Grid>
                </Grid>
            </CustomTabPanel>

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