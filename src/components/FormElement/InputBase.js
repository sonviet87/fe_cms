import React from 'react';
import { useController } from 'react-hook-form';
import { InputBase } from '@mui/material';


function InputBaseForm({ name, placeholder, control, ...inputProps }) {
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
        <InputBase
            error={invalid}
            name={name}
            fullWidth

            placeholder={placeholder}
            value={value}
            size="small"
            onChange={onChange}
            onBlur={onBlur}


        //helperText={error?.message}
        />
    );
}

export default InputBaseForm;