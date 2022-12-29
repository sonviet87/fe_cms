import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { IconButtonStyled } from 'components/Common/SlytedComponent/Button';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';


export default function ReportFilter({ loading, filter, onSubmit, accounts, users }) {

  const navigate = useNavigate();
  const schema = yup.object().shape({


  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      start_day: '',
      end_day: '',

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
        <Grid container spacing={2}>
          <Grid item xs={12} md={2} >
            <BasicDatePicker
              name="start_day"
              lableText="Ngày bắt đầu"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={2} >
            <BasicDatePicker
              name="end_day"
              lableText="Ngày kết thúc"
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={2} >
            <BasicSelect
              name="user_id"
              label="Sale phụ trách"
              control={control}
              options={
                users
              }
            />
          </Grid>
          <Grid item xs={12} md={2} >
            <BasicSelect
              name="supplier_id"
              label="Khách hàng"
              control={control}
              options={
                accounts
              }
            />
          </Grid>
          <Grid item xs={12} md={2} >
            <Box sx={{ width: '300px' }} >
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit(handleFormSubmit)}

              > Tìm kiếm </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>


  )
}
