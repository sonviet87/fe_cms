import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import { statusArray } from 'features/admin/fp/constants/FPConstants';



export default function ReportDebtFPFilter({ loading, filter, onSubmit, accounts, users, suppliers, categories }) {

  const schema = yup.object().shape({
    start_day: yup.string().required('Xin hãy chọn ngày bắt đầu'),
    end_day: yup.string().required('Xin hãy chọn ngày kết thúc'),
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      start_day: '',
      end_day: '',
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
    console.log(formValues)
    await onSubmit(formValues);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} >

        <Grid container spacing={1}>
          <Grid item xs={12} md={2} >
            <BasicDatePicker
              name="start_day"
              lableText="Ngày bắt đầu"
              control={control}
              sx={{ width: '100px' }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <BasicDatePicker
              name="end_day"
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
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2} >
            <BasicSelect
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
              name="type_fp"
              label="Tình trạng PAKD"
              control={control}
              options={
                statusArray
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
              name="category_id"
              label="Danh mục sản phẩm"
              control={control}
              options={
                categories
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <BasicSelect
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
