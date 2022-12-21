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

export default function ReportFilter({ loading, filter, onSubmit }) {

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
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} >
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}

        > Thêm </Button>
      </Box>

    </Box>
  )
}
