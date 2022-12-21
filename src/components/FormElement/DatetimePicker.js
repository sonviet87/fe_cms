import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from '@emotion/styled';
import { useController } from 'react-hook-form';
import { FormControl } from '@mui/material';
import "moment/locale/vi";
import moment from 'moment';
moment.updateLocale("vi", {
    // weekdaysShort: ["一-", "二", "三", "四", "五", "六", "日"],
    months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",]
});
export default function BasicDatePicker({ name, lableText, control, ...inputProps }) {
    const {
        field: { onChange, value },
        fieldState: { invalid, error },
    } = useController({
        name,
        control,
    });

    return (
        <FormControl
            sx={{ marginBottom: '8px', marginTop: '14px' }}
            fullWidth
            size="small"
            error={invalid}

        >
            <LocalizationProvider adapterLocale="vi" dateAdapter={AdapterMoment} sx={{ m: 2 }}>
                <SlytedDatetimePicker
                    dayOfWeekFormatter={(day) => { day.charAt(0).toUpperCase() }}
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