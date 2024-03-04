import React,{useEffect} from 'react';
import {Box} from "@mui/system";
import {Button, Grid} from "@mui/material";
import BasicDatePicker from "../../../../components/FormElement/DatetimePicker";
import BasicSelect from "../../../../components/FormElement/SelectBox";
import AutoCompleteForm from "../../../../components/FormElement/Autocomplete";
import {useSelector} from "react-redux";
import {selectListAccount} from "../../account/accountSlice";
import {selectListContact} from "../../contact/contactSlice";

import {selectListUser} from "../../user/userSlice";
import {selectRoles} from "../../../auth/authSlice";

import AddIcon from "@mui/icons-material/Add";
import {useNavigate} from "react-router-dom";
import moment from "moment";


function ChanceFilter({ loading, filter,onSubmit,methods }) {
    const navigate = useNavigate();
    const accounts = useSelector(selectListAccount);
    const contacts = useSelector(selectListContact)
    const users = useSelector(selectListUser);
    const [disabled, setDisable] = React.useState(false);
    const permissions = useSelector(selectRoles)
    const { control, reset, getValues, setValue, handleSubmit } = methods;

    useEffect(()=>{
        if (!permissions.includes("chance-assign-user")){
            setDisable(true)
        }
    },[])

    const handleFormSubmit = async (formValues) => {
        formValues.startDay = moment(formValues.startDay).format('YYYY-MM-DD');
        formValues.endDay = moment(formValues.endDay).format('YYYY-MM-DD');
        formValues.account_id = formValues.account_id?.id
        formValues.contact_id = formValues.contact_id?.id
        //console.log(formValues)
        await onSubmit(formValues);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{flexGrow:1}} >
                <Grid container spacing={1}>
                    <Grid item xs={12} md={2} >
                        <BasicDatePicker
                            name="startDay"
                            lableText="Từ ngày"
                            control={control}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2}>
                        <BasicDatePicker
                            name="endDay"
                            lableText="Đến ngày"
                            control={control}

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
                    <Grid item xs={12} sm={6} md={2} >
                        <AutoCompleteForm
                            name="contact_id"
                            label="Liên hệ"
                            control={control}
                            options={
                                contacts
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