import React,{useEffect} from 'react';
import {Box} from "@mui/system";
import {Button, Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import AutoCompleteForm from "../../../../components/FormElement/Autocomplete";
import {useSelector} from "react-redux";
import {selectListAccount} from "../../account/accountSlice";

import {selectListUser} from "../../user/userSlice";
import {selectRoles} from "../../../auth/authSlice";
import {fpPermissions} from "../../fp/constants/FPConstants";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";


function ChanceFilter({ loading, filter }) {
    const navigate = useNavigate();
    const accounts = useSelector(selectListAccount);
    const users = useSelector(selectListUser);
    const [disabled, setDisable] = React.useState(false);
    const permissions = useSelector(selectRoles)



    const schema = yup.object().shape({

    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            search: "",
        },
        resolver: yupResolver(schema),
    });


    useEffect(()=>{
        if (permissions.includes(fpPermissions.FP_IS_SALE)){
            setDisable(true)
        }
    },[])

    const handleFormSubmit = async (formValues) => {


        formValues.account_id = formValues.account_id?.id
        //console.log(formValues)
        await handleSubmit(formValues);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={2} >
                        <BasicDatePicker
                            name="startDay"
                            lableText="Ngày bắt đầu"
                            control={control}
                            sx={{ width: '100px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <BasicDatePicker
                            name="endDay"
                            lableText="Ngày kết thúc"
                            control={control}
                            sx={{ width: '100px' }}
                        />
                    </Grid>
                    {!disabled && <Grid item xs={12} sm={6} md={2}>
                        <BasicSelect
                            name="user_id"
                            label="Sale phụ trách"
                            isClear={true}
                            control={control}
                            options={
                                users
                            }
                            //setValue={setValue}
                        />
                    </Grid>}
                    <Grid item xs={12} sm={6} md={2} >
                        <AutoCompleteForm
                            name="account_id"
                            label="Khách hàng"
                            control={control}
                            options={
                                accounts
                            }
                            sx={{ marginTop: '8px' }}
                        />
                    </Grid>



                    <Grid item alignItems="center" display="flex"
                          justifyContent="center">
                        <Box sx={{ width: '300px' }} >
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={handleSubmit(handleFormSubmit)}
                                sx={{ width: '100px' }}
                            > Tìm kiếm </Button>
                        </Box>
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

export default ChanceFilter;