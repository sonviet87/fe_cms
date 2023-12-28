import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, {useEffect} from 'react'
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import { useSelector } from 'react-redux';
import { selectListAccount } from 'features/admin/account/accountSlice';
import { selectListUser } from 'features/admin/user/userSlice';
import {selectRoles} from "../../../auth/authSlice";
import {fpPermissions} from "../../fp/constants/FPConstants";
import AutoCompleteForm from "../../../../components/FormElement/Autocomplete";


export default function ReportDebtFPFilter({ loading, filter, onSubmit, fps ,methods }) {

  const accounts = useSelector(selectListAccount);
  const users = useSelector(selectListUser);
  const [disabled, setDisable] = React.useState(false);
  const permissions = useSelector(selectRoles)


  const { control, handleSubmit, setValue } = methods

  const handleFormSubmit = async (formValues) => {

    if (!onSubmit) return;
    formValues.fp_id = formValues.fp_id?.id
    formValues.account_id = formValues.account_id?.id
    await onSubmit(formValues);
  };

  useEffect(()=>{
    if (permissions.includes(fpPermissions.FP_IS_SALE)){
      setDisable(true)
    }
  },[])
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
          <Grid item xs={12} sm={6} md={2} sx={{mt:1}}>
            <AutoCompleteForm
              setValue={setValue}
              name="fp_id"
              label="Mã PAKD"
              control={control}
              isClear={true}
              options={
                fps
              }
            />
          </Grid>
          {!disabled && <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              setValue={setValue}
              name="user_id"
              label="Sale phụ trách"
              control={control}
              isClear={true}
              options={
                users
              }
            />
          </Grid>}
          <Grid item xs={12} sm={6} md={2} sx={{mt:1}}>
            <AutoCompleteForm
              name="account_id"
              label="Khách hàng"
              control={control}
              isClear={true}
              options={
                accounts
              }
              setValue={setValue}
            />
          </Grid>


          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              name="isDone"
              label="Tình trạng"
              control={control}
              isClear={true}
              setValue={setValue}
              options={
                [
                  { id: 2, name: "Chưa thu" },
                  { id: 1, name: "Đã thu xong" },

                ]
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={1} alignItems="center" display="flex"
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

    </Box>


  )
}
