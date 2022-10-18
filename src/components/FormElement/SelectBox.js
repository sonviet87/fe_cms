import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';
import { useController } from 'react-hook-form';
import { FormHelperText } from '@mui/material';

export default function BasicSelect({ name, label, control, options = [], ...inputProps }) {

    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (

        <FormControl
            sx={{ minWidth: 120, marginBottom: '8px' }}
            fullWidth
            size="small"
            error={invalid}

        >
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <SlytedSelect labelId={`select-${name}`} label={label} value={value} onChange={onChange} >

                {options?.map((row, i) => (
                    <MenuItem key={i} value={row.id}>
                        {row.name}
                    </MenuItem>
                ))}
            </SlytedSelect>
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>

    );
}

export const SlytedSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        padding: '8px 14px'
    },
    margin: '0 5px'
}))