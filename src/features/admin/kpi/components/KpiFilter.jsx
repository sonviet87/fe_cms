import React, {useState} from 'react';
import {Box} from "@mui/system";
import { Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import LoadingButton from "@mui/lab/LoadingButton";
import {quartersKpiArray, statusKpi, statuskPIArray} from "../constants/KpiConstants";
import moment from "moment";

function KpiFilter({ loading, filter, onSubmit,methods,memberGroup }) {
    const { control, handleSubmit, setValue,getValues,watch,reset }= methods;
    const [selectedTypeKpi, setSelectedTypeKpi] = useState(statusKpi.KPI_MONTHS);
    const dateTimePickerKey = watch('selectedDay');

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        delete formValues.dateTimePickerKey;
        delete formValues.kpiTypeQuarter;
        delete formValues.selectedDay;
        console.log(formValues)
        await onSubmit(formValues);
    };
    const handleKpiTypeChange = (event) => {
        const kpiType = event.target.value;
        reset({ selectedDay: '',
                dateTimePickerKey: Date.now(),
                kpiTypeQuarter:'' ,
                startDay: '',
                endDay: '',
                groupMember:'',

                });
        setSelectedTypeKpi((kpiType));
        setValue('kpiType',kpiType)
    }
    const handleQuarterChange = (event) => {
        const quarter = event.target.value;
        setValue('kpiTypeQuarter',quarter)

        if(getValues('selectedDay')!==''){
            const selectedYear = getValues('selectedDay').year();

            const startDate = new Date(selectedYear, ((quarter - 1 ) * 3), 1);
            const endDate = new Date(selectedYear, ((quarter - 1) + 1) * 3, 0);

            const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
            const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
             //console.log('Ngày bắt đầu:', startDate.toISOString().slice(0, 10));
            //console.log('Ngày kết thúc:', endDate.toISOString().slice(0, 10));
          //  console.log('Ngày kết thúc:', formattedStartDate);
           // console.log('Ngày kết thúc:', formattedEndDate);
            setValue('startDay',moment(startDate));
            setValue('endDay',moment(endDate));
        }

    };

    const handleDateChange = (date) => {

        const typeQuarter = getValues('kpiTypeQuarter');
        if(getValues('kpiType') === statusKpi.KPI_MONTHS){
            const startDate = new Date(date.year(), date.month(), 1);
            const endDate = new Date(date.year(), date.month() + 1, 0);

            setValue('startDay',moment(startDate));
            setValue('endDay',moment(endDate));
        }

        if(getValues('kpiType') === statusKpi.KPI_3_MONTHS && typeQuarter !== ''){
            const startDate = new Date(date.year(), ((typeQuarter - 1 ) * 3), 1);
            const endDate = new Date(date.year(), ((typeQuarter - 1) + 1) * 3, 0);

            setValue('startDay',moment(startDate));
            setValue('endDay',moment(endDate));
        }

        if(getValues('kpiType') === statusKpi.KPI_12_MONTHS ){
            const startDate = new Date(date.year(), 0, 1);
            const endDate = new Date(date.year(), 12, 0);
           // const formattedStartDate = `${startDate.getFullYear()}-${(startDate.getMonth() + 1).toString().padStart(2, '0')}-${startDate.getDate().toString().padStart(2, '0')}`;
          //  const formattedEndDate = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`;
           // console.log('formattedStartDate',formattedStartDate);
           // console.log('formattedEndDate',formattedEndDate);
            setValue('startDay',moment(startDate));
            setValue('endDay',moment(endDate));
        }

    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} width="100%" >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6} md={2}>
                        <BasicSelect
                            name="kpiType"
                            label="Loại kpi"
                            isClear={true}
                            control={control}
                            options={
                                statuskPIArray
                            }
                            setValue={setValue}
                            onChangeValue={handleKpiTypeChange}
                        />
                    </Grid>

                    {
                        selectedTypeKpi === statusKpi.KPI_3_MONTHS && <Grid item xs={12} sm={6} md={2}>
                            <BasicSelect
                                name="kpiTypeQuarter"
                                label="Quý"
                                isClear={true}
                                control={control}
                                onChange={handleQuarterChange}
                                options={
                                    quartersKpiArray
                                }
                                setValue={setValue}
                                minWidth="100"
                            />
                        </Grid>
                    }

                    <Grid item xs={12} md={2} >
                        {
                            selectedTypeKpi === statusKpi.KPI_MONTHS ?  <BasicDatePicker
                                name="selectedDay"
                                lableText="Tháng"
                                control={control}
                                openTo="month"
                                views={['year', 'month']}
                                onChangeAjax={handleDateChange}
                                key={dateTimePickerKey}

                            /> : <BasicDatePicker
                                name="selectedDay"
                                lableText="Năm"
                                control={control}
                                openTo="year"
                                views={['year']}
                                onChangeAjax={handleDateChange}
                                key={dateTimePickerKey}
                            />
                        }

                    </Grid>

                     <Grid item xs={12} sm={6} md={2}>
                        <BasicSelect
                            name="groupMember"
                            label="Nhóm"
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

export default KpiFilter;