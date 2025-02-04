import React, {useState} from 'react';
import {Box} from "@mui/system";
import {Button, Grid} from "@mui/material";

import BasicSelect from "../../../../components/FormElement/SelectBox";
import LoadingButton from "@mui/lab/LoadingButton";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import TextFormik from "../../../../components/FormElement/TextFormik";


function TechnicalCertificateFilter({ loading, filter,selectedTypeKpi, onSubmit,methods,users }) {
    const navigate = useNavigate();
    const schema = yup.object().shape({


    });

    const { control, handleSubmit,setValue } = useForm({
        defaultValues: {

        },
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;
        await onSubmit(formValues);
    };


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} width="100%" >
                <Grid container spacing={1}>
                    <Grid item>
                        <TextFormik  size="small" name="search"  placeholder="Tìm chứng chỉ"     control={control} />
                    </Grid>
                     <Grid item xs={12} sm={6} md={2}>
                        <BasicSelect
                            name="user_id"
                            label="Người dùng"
                            isClear={true}
                            control={control}
                            setValue ={setValue}
                            options={
                                users
                            }

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
            <Button
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => { navigate('add') }}
            > Thêm </Button>
        </Box>

    );
}

export default TechnicalCertificateFilter;