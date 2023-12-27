import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { IconButtonStyled } from 'components/Common/SlytedComponent/Button';
import InputBaseForm from 'components/FormElement/InputBase';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import BasicSelect from "../../../../components/FormElement/SelectBox";
import {statusApproved} from "../../fp/constants/FPConstants";
import {statusDebtSupplier} from "../constants/debtSupplierConstants";

export default function DebtSupplierFilter({ loading, filter, onSubmit }) {

  const navigate = useNavigate();
  const schema = yup.object().shape({


  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues) => {

    if (!onSubmit) return;
    await onSubmit(formValues);
  };
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{display:'flex', alignItems:'center'}}>
        <Box sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, border: '1px solid #acacac', borderRadius: '5px',height:'40px' }}>

           <InputBaseForm
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm công nợ"
            inputProps={{ 'aria-label': 'Tìm công nợ' }}
            control={control}
            name="keyword"
          />



        </Box>
          <Box>
              <BasicSelect
                  name="status"
                  label="Tình trạng"
                  isClear={true}
                  control={control}
                  options={
                      [
                          { id: 0, name: 'Tất cả' },
                          { id: statusDebtSupplier.PAID, name: 'Đã trả' },
                          { id: statusDebtSupplier.UNPAID, name: 'Chưa trả' },
                      ]
                  }

              />
          </Box>
          <Box>
              <Button sx={{ml:'10px'}} onClick={handleSubmit(handleFormSubmit)} variant="contained" >
                  Tìm kiếm
              </Button>
          </Box>
      </Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => { navigate('add') }}
        > Thêm </Button>
       </Box>

    </Box>
  )
}
