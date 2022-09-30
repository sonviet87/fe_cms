import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';
import { useController } from 'react-hook-form';
import { FormControl } from '@mui/material';
import vi from "moment/locale/vi";

export default function BasicDatePicker({ name, lableText, control, ...inputProps }) {
    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl>
            <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment} sx={{ m: 2 }}>
                <SlytedDatetimePicker

                    {...inputProps}
                    value={value}
                    onChange={onChange}
                    label={lableText}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    renderInput={(params) => <TextField {...params} helperText={error?.message}
                        error={!!error} />}
                // format="DD-MM-YYYY"

                />

            </LocalizationProvider>
        </FormControl>
    );
}

export const SlytedDatetimePicker = styled(DatePicker)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        top: '-8px'
    },
    '& .MuiInputBase-input': {
        padding: '8px 10px'
    },
    margin: '0 5px'
}))