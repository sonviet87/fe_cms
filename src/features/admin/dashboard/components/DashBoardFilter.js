import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import { Button, FormControl } from '@mui/material';
import BasicSelect from 'components/FormElement/SelectBox';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';



const DashBoardFilter = ({ loading, filter, onSubmit, onExport }) => {
    const schema = yup.object().shape({
        typeAccount: yup.string().required('Vui lòng chọn phân loại tài khoản'),
        typeTransaccsion: yup.string().required('Vui lòng chọn phân loại giao dịch'),
        startDay: yup.string().required('Vui lòng chọn ngày bắt đầu').nullable(),
        endDay: yup.string().required('Vui lòng chọn ngày kết thúc').nullable(),
    });

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            typeAccount: "",
            typeTransaccsion: "",
            startDay: null,
            endDay: null,
        },
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {

        if (!onSubmit) return;

        await onSubmit(formValues);
    };
    const handleFormExportExel = (formValues) => {
        if (!onExport) return;
        onExport(formValues)
    }
    return (
        <Box component="form" alignItems="center" onSubmit={handleSubmit(handleFormSubmit)}>
            <BasicDatePicker lableText="Từ ngày" name="startDay" control={control} />
            <BasicDatePicker lableText="Đến ngày" name="endDay" control={control} />

            <FormControl sx={{ minWidth: 220 }}>
                <BasicSelect
                    name="typeTransaccsion"
                    label="Phân loại giao dịch"
                    control={control}
                    options={[
                        { label: 'Tất cả', value: '0' },
                        { label: 'Công ty thành viên', value: '2' },
                        { label: 'Tài xế', value: '3' },
                        { label: 'Lãi xuất ngân hàng', value: '4' },
                        { label: 'Phí ngân hàng', value: '5' },
                        { label: 'Khác', value: '6' },
                    ]}
                />
            </FormControl>
            <FormControl sx={{ minWidth: 220, flexGrow: 1 }}>
                <BasicSelect
                    name="typeAccount"
                    label="Phân loại Tài khoản"
                    control={control}
                    options={[
                        { label: 'Tất cả', value: '0' },
                        { label: 'Tài khoản nạp tiền chuyên dụng', value: '100202034548' },
                        { label: 'Tài khoản rút tiền chuyên dụng', value: '100202034548' },

                    ]}
                />
            </FormControl>
            <Button variant="contained" onClick={handleSubmit(handleFormExportExel)} color="success" size="medium" sx={{ mr: 1, ml: 1 }}>  Xuất Exel </Button>
            <Button variant="contained" size="medium" type="submit" >  Tra cứu </Button>
        </Box>
    );
};

DashBoardFilter.propTypes = {

};

export default DashBoardFilter;