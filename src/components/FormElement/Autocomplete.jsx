import { Autocomplete } from '@mui/material';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';
import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';
import _debounce from 'lodash/debounce';

export default function AutoCompleteForm({ name, label, control, options, onChangeAjax, ...inputProps }) {
    const {
        field: { ref, onChange, onBlur, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });
    const debounceFn = useCallback(_debounce(function (v) {
        onChangeAjax(v)
    }, 1000));
    const handleInputChange = (e, v) => {
        if (!onChangeAjax) return;
        debounceFn(v);

    };
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
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}
                    </li>
                );
            }}
            options={options}
            getOptionLabel={option => option.name ? option.name : ""}
            isOptionEqualToValue={(option, value) => value === undefined || value === "" || option.id === value.id}
            renderInput={(params) => <TextFiledStyled {...params} label={label} inputRef={ref} error={!!error?.message}
                helperText={error?.message} />}

            {...inputProps}
        />
    );
}