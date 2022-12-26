import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import fpApi from 'api/fpAPI';



DebtForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function DebtForm({ initialValue, onSubmit, itemValue, isEdit, fp }) {
    const validationRules = {
        name: yup.string().required('Please enter your name'),
        phone: yup.string().required('Please enter phone'),

    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        await onSubmit(formValues);
    };

    const handleCallAPIFP = async (formValue) => {

        const fpRs = await fpApi.get(formValue);
        if (fpRs.status) {
            const totalDebt = fpRs.data.data.details.reduce((total, num) => {
                console.log(num.price_sell + " ----"); console.log(num.category.tax_percent + " ----");
                return total + (parseInt(num.price_sell) * parseInt(num.category.tax_percent.replace(/%/g, '')));
            }, 0);
            console.log('totalDebt', totalDebt)
            setValue('account', fpRs.data.data.account)
            setValue('number_invoice', fpRs.data.data.number_invoice)
            setValue('date_invoice', fpRs.data.data.date_invoice)
        }
    };

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', itemValue.name);
            setValue('phone', itemValue.phone);
            setValue('address', itemValue.address);
            setValue('legal_name', itemValue.legal_name);

            setValue('industry', itemValue.industry);


        }
    }, [itemValue]);

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleFormSubmit)}

        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                    <TextFormik name="name" label="Tên" control={control} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BasicSelect
                        name="fp_id"
                        label="Mã PAKD"
                        control={control}
                        options={fp}
                        onChangeAjax={handleCallAPIFP}
                    // disabled={disabled}
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextFormik name="account" label="Tên khách hàng" control={control} />
                </Grid>
                <Grid item xs={12} md={4} >
                    <TextFormik name="number_invoice" label="Số hóa đơn" control={control} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextFormik name="date_invoice" label="Ngày xuất hóa đơn" control={control} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicDatePicker
                        name="date_over"
                        lableText="Ngày đến hạn"
                        control={control}
                        sx={{ minWidth: '200px' }}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik
                        name="number_date_over"
                        label="Số ngày đã quá hạn"
                        control={control}

                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik
                        name="total_debt"
                        label="Tổng tiền hóa đơn"
                        control={control}

                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicSelect
                        name="deposit_percent"
                        label="Phần trăm cọc"
                        control={control}
                        options={
                            [
                                { id: 0, name: "0%" },
                                { id: 10, name: "10%" },
                                { id: 20, name: "20%" },
                                { id: 30, name: "30%" },
                                { id: 40, name: "40%" },
                                { id: 50, name: "50%" },
                                { id: 60, name: "60%" },
                                { id: 70, name: "70%" },
                                { id: 80, name: "80%" },
                                { id: 90, name: "90%" },
                                { id: 100, name: "100%" },
                            ]
                        }

                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="pay_first" label="Cọc" control={control} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="pay_second" label="Nợ" control={control} />
                </Grid>

                <Grid item xs={12} md={12}>
                    <LoadingButton
                        onClick={handleSubmit(handleFormSubmit)}
                        color="primary"
                        loading={isSubmitting}
                        loadingIndicator="Loading..."
                        variant="contained"
                    >
                        Lưu
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DebtForm;
