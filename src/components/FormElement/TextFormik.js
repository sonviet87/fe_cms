import React from 'react';
import { useController } from 'react-hook-form';
import {TextFiledStyled, TextFiledStyledSmall} from 'components/Common/SlytedComponent/Input';
import {NumberFormatBase, NumericFormat} from 'react-number-format';
import { FormHelperText } from '@mui/material';
// import { Container } from './styles';
export  function TextFiledSmall({ name, label, control, multiline = false, onBlur, ...inputProps }) {
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
        <TextFiledStyledSmall
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
                size="small"
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
export const TextFieldNumberSmall = ({ name, label, control, onValueChange,variant="outlined" ,...inputProps }) => {
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
                customInput={TextFiledStyledSmall}
                thousandSeparator={true}
                value={value}
                {...inputProps}
                label={label}
                margin="normal"
                size="small"
                variant = {variant}
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
export const TextFieldNumberBase = ({ name, label, control, onValueChange, ...inputProps }) => {
    const {
        field: { ref, onChange, onBlur, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
        rules: { required: true },
        defaultValue: '',
    });

    const format = (numStr) => {
        if (numStr === '') return '';
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 0,
        }).format(numStr);
    };
    const removeFormatting = (formattedValue) => {
        const test = formattedValue.replace(/,/g, '')
        return formattedValue.replace(/,/g, '');
    };

    return (
        <>
            <NumberFormatBase
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
                format={format}
                removeFormatting={removeFormatting}
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