import React from 'react';
import { useController } from 'react-hook-form';
import { TextField } from '@mui/material';
// import { Container } from './styles';

function TextFormik({ name, label, control, ...inputProps }) {
    const {
        field: { ref, onChange, onBlur, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    return (
        <TextField
            error={invalid}
            name={name}
            fullWidth
            label={label}
            value={value}
            margin="normal"
            size="small"
            variant="outlined"
            inputRef={ref}
            onChange={onChange}
            onBlur={onBlur}
            inputProps={inputProps}
            helperText={error?.message}
        />
    );
}

export default TextFormik;