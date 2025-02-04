import React from 'react';
import {Box} from "@mui/system";
import { Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import LoadingButton from "@mui/lab/LoadingButton";

import moment from "moment";
import {TextFieldNumber} from "../../../../components/FormElement";


function CostsFilter({ loading, filter, onSubmit,methods,memberGroup }) {

    const { control, handleSubmit}= methods;

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
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

                            />
                    </Grid>

                     <Grid item xs={12} sm={6} md={2}>
                         <TextFieldNumber   name="percent" label="Phần trăm lợi nhuận" control={control} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} sx={{mt:1}}>
                        <LoadingButton
                            onClick={handleSubmit(handleFormSubmit)}
                            color="primary"

                            loadingIndicator="Loading..."
                            variant="contained"
                        >
                            Xem
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
}

export default CostsFilter;