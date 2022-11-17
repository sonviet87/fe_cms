import React from 'react';
import { useController } from 'react-hook-form';
import { TextFiledStyled } from 'components/Common/SlytedComponent/Input';
import { NumericFormat } from 'react-number-format';
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
        <TextFiledStyled
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
            inputProps={inputProps}
            helperText={error?.message}
            inputRef={ref}

        />

    );
}

export default TextFormik;