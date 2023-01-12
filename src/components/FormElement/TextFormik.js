import React from 'react';
import { useController } from 'react-hook-form';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';
import { NumericFormat } from 'react-number-format';
import { FormHelperText } from '@mui/material';
// import { Container } from './styles';

function TextFormik({ name, label, control, multiline = false, onBlur, ...inputProps }) {
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
        <TextFiledStyled
            error={invalid}
            name={name}
            fullWidth
            multiline={multiline}
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
            {...inputProps}
        />
    );
}
export const TextFieldNumber = ({ name, label, control, onValueChange, ...inputProps }) => {
    const {
        field: { ref, onChange, onBlur, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });

    // const setErrorStyle = (name) => {
    //     return {
    //          borderColor: name ? "red" : "",
    //          boxShadow: name ? "0 0 1.5px 1px red" : "",

    //     };
    // };
    return (
        <>
            <NumericFormat
                customInput={TextFiledStyled}
                thousandSeparator={true}
                value={value}
                {...inputProps}
                label={label}
                margin="normal"
                size="small"
                variant="outlined"
                onValueChange={onValueChange}
                onChange={onChange}
                onBlur={onBlur}
                getInputRef={ref}
            //disabled={true}
            //error={!!invalid}
            //helperText={error?.message}
            //inputRef={ref}
            //style={setErrorStyle(error?.message)}

            />
            {invalid && <FormHelperText error={true}>{error?.message}</FormHelperText>}
        </>
    );
}

export const TextFieldNumberAuto = ({ name, label, control, onValueChange, ...inputProps }) => {
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
        <NumericFormat
            customInput={TextFiledStyled}
            thousandSeparator={true}
            value={value}
            {...inputProps}
            label={label}
            margin="normal"
            size="small"
            variant="outlined"
            onValueChange={onValueChange}
            onChange={onChange}
            onBlur={onBlur}
            InputProps={{
                inputProps: {
                    type: 'number',
                    min: 0, max: 100,
                },
            }}
            helperText={error?.message}
            inputRef={ref}

        />

    );
}

export default TextFormik;