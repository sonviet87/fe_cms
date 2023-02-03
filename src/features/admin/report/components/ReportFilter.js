import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, {useEffect} from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import {fpPermissions, statusArray} from 'features/admin/fp/constants/FPConstants';
import AutoCompleteForm from 'components/FormElement/Autocomplete';
import { selectListAccount } from 'features/admin/account/accountSlice';
import { selectListCategory } from 'features/admin/category/categorySlice';
import { selectListSupplier } from 'features/admin/supplier/supplierSlice';
import { selectListUser } from 'features/admin/user/userSlice';
import { useSelector } from 'react-redux';
import {selectRoles} from "../../../auth/authSlice";


export default function ReportFilter({ loading, filter, onSubmit }) {

  const accounts = useSelector(selectListAccount);
  const categories = useSelector(selectListCategory);
  const suppliers = useSelector(selectListSupplier);
  const users = useSelector(selectListUser);
  const [disabled, setDisable] = React.useState(false);
  const permissions = useSelector(selectRoles)
  const schema = yup.object().shape({
    startDay: yup.string().required('Xin hãy chọn ngày bắt đầu'),
    endDay: yup.string().required('Xin hãy chọn ngày kết thúc'),
  });

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      startDay: '',
      endDay: '',
      user_id: '',
      supplier_id: '',
      account_id: '',
      category_id: '',
      type_fp: '',

    },
    resolver: yupResolver(schema),
  });

  // const handleOnAjaxCategory = (value) => {
  //   onHandleChangeListCategory(value)

  // }

  useEffect(()=>{
    if (permissions.includes(fpPermissions.FP_IS_SALE)){
      setDisable(true)
    }
 },[])

  const handleFormSubmit = async (formValues) => {

    if (!onSubmit) return;

    formValues.category_id = formValues.category_id?.id
    formValues.supplier_id = formValues.supplier_id?.id
    formValues.account_id = formValues.account_id?.id
    //console.log(formValues)
    await onSubmit(formValues);
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
              setValue={setValue}
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
          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              setValue={setValue}
              name="type_fp"
              label="Tình trạng PAKD"
              isClear={true}
              control={control}
              options={
                statusArray
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AutoCompleteForm
              name="category_id"
              label="Danh mục sản phẩm"
              control={control}
              options={
                categories
              }
              sx={{ marginTop: '8px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AutoCompleteForm
              name="supplier_id"
              label="Nhà cung cấp"
              control={control}
              options={
                suppliers
              }
              sx={{ mt: 1, ml: 1 }}
            //onChangeAjax={handleOnAjaxCategory}
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

    </Box>


  )
}
