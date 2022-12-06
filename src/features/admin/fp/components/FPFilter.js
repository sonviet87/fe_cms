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

export default function FPFilter({ loading, filter, onSubmit }) {

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
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, border: '1px solid #acacac', borderRadius: '8px' }}>
        <InputBaseForm
          sx={{ ml: 1, flex: 1 }}
          placeholder="Tìm PAKD"
          inputProps={{ 'aria-label': 'Tìm PAKD' }}
          control={control}
          name="username"
        />
        <IconButtonStyled type="button" sx={{ p: '10px' }} aria-label="search" size="small" onClick={handleSubmit(handleFormSubmit)}>
          <SearchIcon />
        </IconButtonStyled>
      </Box>
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => { navigate('add') }}
      > Thêm </Button>
    </Box>
  )
}
