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
                onChange={onChange}
                control={<Checkbox size="small" inputProps={inputProps} color="secondary" />}
                label={label}
            />
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </>
    );
}

export default CheckboxField;
