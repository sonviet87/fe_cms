import React from 'react';
import {Box} from "@mui/system";
import { Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import LoadingButton from "@mui/lab/LoadingButton";


function KpiFilter({ loading, filter, onSubmit,methods,memberGroup }) {
    const { control, handleSubmit, setValue }= methods;
    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={4} >
                        <BasicDatePicker
                            name="startDay"
                            lableText="Ngày bắt đầu"
                            control={control}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <BasicDatePicker
                            name="endDay"
                            lableText="Ngày kết thúc"
                            control={control}

                        />
                    </Grid>
                     <Grid item xs={12} sm={6} md={4}>
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
                    <Grid item xs={12} sm={6} md={4}>
                        <LoadingButton
                            onClick={handleSubmit(handleFormSubmit)}
                            color="primary"

                            loadingIndicator="Loading..."
                            variant="contained"
                        >
                            Lưu
                        </LoadingButton>
                    </Grid>


                </Grid>
            </Box>

        </Box>

    );
}

export default KpiFilter;