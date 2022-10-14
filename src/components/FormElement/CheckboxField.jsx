import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useController } from 'react-hook-form';

CheckboxField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};


function CheckboxField({ name, label, control, isArray = false, ...inputProps }) {
    const {
        field: { ref, onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });


    return (
        <>
            <FormControlLabel
                inputRef={ref}
                value={inputProps.value}
                onChange={(e) => {
                    if (isArray) {
                        const valueCopy = [...value];
                        if (e.target.checked) {
                            valueCopy.push(inputProps.value); // append to array
                        } else {
                            const idx = valueCopy.findIndex(
                                (formOption) => formOption[1] === inputProps.value
                            );
                            valueCopy.splice(idx, 1); // remove from array
                        }
                        onChange(valueCopy); // update form field with new array
                    } else {
                        onChange(e.target.checked)
                    }

                }}
                control={<Checkbox size="small" inputProps={inputProps} color="secondary" />}
                label={label}
            />
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </>
    );
}

export default CheckboxField;
