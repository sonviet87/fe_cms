import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import { statusArray } from 'features/admin/fp/constants/FPConstants';


export default function ReportFilter({ loading, filter, onSubmit, accounts, users, suppliers, categories }) {

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
        <WrapperBoxAlign>
          <BasicDatePicker
            name="start_day"
            lableText="Ngày bắt đầu"
            control={control}
            sx={{ minWidth: '120px' }}
          />

          <BasicDatePicker
            name="end_day"
            lableText="Ngày kết thúc"
            control={control}
            sx={{ minWidth: '120px' }}
          />

          <BasicSelect
            name="user_id"
            label="Sale phụ trách"
            control={control}
            options={
              users
            }
          />

          <BasicSelect
            name="account_id"
            label="Khách hàng"
            control={control}
            options={
              accounts
            }
          />


          <Box sx={{ width: '300px' }} >
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmit(handleFormSubmit)}
              sx={{ width: '100px' }}
            > Tìm kiếm </Button>
          </Box>
        </WrapperBoxAlign>
        <WrapperBoxAlign>
          <BasicSelect
            name="type_fp"
            label="Tình trạng PAKD"
            control={control}
            options={
              statusArray
            }
          />
          <BasicSelect
            name="category_id"
            label="Danh mục sản phẩm"
            control={control}
            options={
              categories
            }
          />
          <BasicSelect
            name="supplier_id"
            label="Nhà cung cấp"
            control={control}
            options={
              suppliers
            }
          />

        </WrapperBoxAlign>
      </Box>

    </Box>


  )
}
