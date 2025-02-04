import React from 'react';
import {Box} from "@mui/system";
import { Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import LoadingButton from "@mui/lab/LoadingButton";

import moment from "moment";


function KpiSupplierFilter({ loading, filter, onSubmit,methods,memberGroup,onGetKpiSetting }) {

    const { control, handleSubmit, setValue,getValues,watch,reset }= methods;

    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;
        await onSubmit(formValues);
    };
    const handleDateChange = async (date) => {

        setValue('groupMember','');
        await onGetKpiSetting(date.year());

    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} width="100%" >
                <Grid container spacing={1}>

                    <Grid item xs={12} md={2} >
                           <BasicDatePicker
                                name="selectedYear"
                                lableText="Năm"
                                control={control}
                                openTo="year"
                                views={['year']}
                                onChangeAjax={handleDateChange}
                            />
                    </Grid>

                     <Grid item xs={12} sm={6} md={2}>
                        <BasicSelect
                            name="groupMember"
                            label="KPI"
                            isClear={true}
                            control={control}
                            options={
                                memberGroup
                            }
                            setValue={setValue}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{mt:1}}>
                        <LoadingButton
                            onClick={handleSubmit(handleFormSubmit)}
                            color="primary"

                            loadingIndicator="Loading..."
                            variant="contained"
                        >
                            Tìm kiếm
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
}

export default KpiSupplierFilter;