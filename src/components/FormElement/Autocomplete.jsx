import { Autocomplete } from '@mui/material';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';
import React, { useCallback } from 'react';
import { useController } from 'react-hook-form';
import _debounce from 'lodash/debounce';

export default function AutoCompleteForm({ name, label, control, options, onChangeAjax, displayName ='name',...inputProps }) {
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
      //  if (!onChangeAjax) return;
       // debounceFn(v);
        console.log(v);

    };
    return (
        <Autocomplete
            value={value}
            size="small"
            onChange={(event, item) => {
                onChange(item);
                if (!onChangeAjax) return;
                if(item) onChangeAjax(item.id)
            }}
           // onInputChange={handleInputChange}
            //disablePortal
            // filterSelectedOptions={true}
            //freeSolo
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option[displayName]}
                    </li>
                );
            }}

            options={options}
            getOptionLabel={option => option[displayName] ? option[displayName] : ""}
            isOptionEqualToValue={(option, value) => { return value === undefined || value === "" || parseInt(option.id) === parseInt(value.id) }}
            renderInput={(params) => <TextFiledStyled {...params} label={label} inputRef={ref} error={!!error?.message}
                helperText={error?.message} />}

            {...inputProps}
        />
    );
}