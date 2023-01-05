import { Autocomplete, TextField } from '@mui/material';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';
import React from 'react';
import { useController } from 'react-hook-form';


export default function AutoCompleteForm({ name, label, control, options, ...inputProps }) {
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
        <Autocomplete
            value={value}

            size="small"
            onChange={(event, item) => {
                console.log(item)
                onChange(item);
            }}
            //onInputChange={handleInputChange}
            //disablePortal
            // filterSelectedOptions={true}
            // freeSolo
            options={options}
            getOptionLabel={option => option.name ? option.name : ""}
            isOptionEqualToValue={(option, value) => value === undefined || value === "" || option.id === value.id}
            renderInput={(params) => <TextFiledStyled {...params} label={label} inputRef={ref} error={!!error?.message}
                helperText={error?.message} />}
        />
    );
}