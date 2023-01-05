import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import { statusArray } from 'features/admin/fp/constants/FPConstants';
import AutoCompleteForm from 'components/FormElement/Autocomplete';




export default function ReportFilter({ loading, filter, onSubmit, accounts, users, suppliers, categories }) {

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
          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              name="user_id"
              label="Sale phụ trách"
              control={control}
              options={
                users
              }
              setValue={setValue}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
            <AutoCompleteForm
              name="account_id"
              label="Khách hàng"
              control={control}
              options={
                accounts
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              setValue={setValue}
              name="type_fp"
              label="Tình trạng PAKD"
              control={control}
              options={
                statusArray
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            {/* <BasicSelect
              name="category_id"
              label="Danh mục sản phẩm"
              control={control}
              options={
                categories
              }
            /> */}
            <AutoCompleteForm
              name="category_id"
              label="Danh mục sản phẩm"
              control={control}
              options={
                categories
              }

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
