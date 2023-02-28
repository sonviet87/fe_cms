import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik, { TextFieldNumber } from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import fpApi from 'api/fpAPI';
import moment from 'moment/moment';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import AutoCompleteForm from "components/FormElement/Autocomplete";

DebtForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};


function DebtForm({ initialValue, onSubmit, itemValue, isEdit, fp }) {
    const navigate = useNavigate();
    const [fpdetails, setFPDetails] = React.useState([]);
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên công nợ'),
        //fp_id: yup.string().required('Xin hãy chọn 1 mã phương án kinh doanh'),
        fp_id: yup.mixed()
            .test("required", "Xin hãy chọn 1 mã phương án kinh doanh", (item) => {
                if (item) return true;
                return false;
            }),
        deposit_percent: yup.string().required('Xin hãy chọn phần trăm cọc'),
        date_over: yup.string().required('Xin hãy ngày đến hạn'),

    };

    const schema = yup.object().shape(validationRules);
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setValue,
        getValues
    } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        delete formValues.number_invoice;
        delete formValues.account;
        delete formValues.date_invoice;
        formValues.fp_id = formValues.fp_id.id;
        await onSubmit(formValues);
    };

    const handleCallAPIFP = async (formValue) => {

        const fpRs = await fpApi.get(formValue);
        if (fpRs.status) {
            const totalDebt = fpRs.data.data.details.reduce((total, num) => {
                return total += ((parseInt(num.price_sell)* parseInt(num.qty)) + ((parseInt(num.price_sell)* parseInt(num.qty)) * (parseInt(num.category.tax_percent.replace(/%/g, '')) / 100)));
            }, 0);
            setValue('account', fpRs.data.data.account)
            setValue('number_invoice', fpRs.data.data.number_invoice)
            setValue('date_invoice', fpRs.data.data.date_invoice)
            setValue('total_debt', totalDebt)
            setFPDetails(fpRs.data.data.details)
        }
    };

    const handleChangeDeposit = (formValue) => {
        const percentDebt = (100 - parseInt(formValue)) / 100;
        const percentDeposit = parseInt(formValue) / 100;
        const deposit = parseInt(getValues('total_debt')) * percentDeposit;
        const debt = parseInt(getValues('total_debt')) * percentDebt;
        setValue('pay_first', deposit);
        setValue('pay_second', debt);
    }

    const handleChangeDateOver = (e) => {
        const dateOver = moment(e);
        const dateOne = new Date(dateOver);
        dateOne.setHours(0, 0, 0, 0);
        const toDay = new Date();
        toDay.setHours(0, 0, 0, 0);
        const resultOverDay = Math.ceil(toDay.getTime() / (1000 * 60 * 60 * 24)) - (dateOne.getTime() / (1000 * 60 * 60 * 24)).toFixed(0);
        setValue('number_date_over', resultOverDay > 0 ? resultOverDay : 0)

    }

    React.useEffect(() => {
        if (isEdit) {
            setValue('name', itemValue.name);
            setValue('fp_id', itemValue.fp_id);
            setValue('account', itemValue.account);
            setValue('number_invoice', itemValue.number_invoice);
            setValue('date_invoice', itemValue.date_invoice);
            setValue('number_date_over', itemValue.number_date_over);
            setValue('total_debt', itemValue.total_debt);
            setValue('deposit_percent', itemValue.deposit_percent);
            setValue('pay_first', itemValue.pay_first);
            setValue('pay_second', itemValue.pay_second);
            setValue('isDone', itemValue.isDone);
            setValue('date_over', itemValue.date_over);
            setFPDetails(itemValue.details ?? [])

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
                <Grid item xs={12} md={3}>
                    <AutoCompleteForm
                        name="fp_id"
                        label="Mã PAKD"
                        control={control}
                        disabled={isEdit}
                        options={fp}
                        onChangeAjax={handleCallAPIFP}
                        displayName="code"
                    // disabled={disabled}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <BasicSelect
                        name="isDone"
                        label="Tình trạng"
                        control={control}

                        options={
                            [
                                { id: 2, name: "Chưa thu" },
                                { id: 1, name: "Đã thu xong" },

                            ]
                        }
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik name="account" label="Tên khách hàng" control={control} disabled={true} />
                </Grid>
                <Grid item xs={12} md={4} >
                    <TextFormik name="number_invoice" label="Số hóa đơn" control={control} disabled={true} />
                </Grid>

                <Grid item xs={12} md={4}>

                    <BasicDatePicker
                        name="date_invoice"
                        lableText="Ngày xuất hóa đơn"
                        control={control}
                        disabled={true}
                        inputFormat="DD-MM-YYYY"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <BasicDatePicker
                        name="date_over"
                        lableText="Ngày đến hạn"
                        control={control}
                        sx={{ minWidth: '200px' }}
                        onChangeAjax={handleChangeDateOver}
                    // disabled={isEdit}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFormik
                        name="number_date_over"
                        label="Số ngày đã quá hạn"
                        control={control}
                    //disabled={isEdit}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFieldNumber
                        name="total_debt"
                        label="Tổng tiền hóa đơn"
                        control={control}
                        sx={{ width: "100%" }}
                    //disabled={isEdit}
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
                        //disabled={isEdit}
                        onChangeAjax={handleChangeDeposit}

                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFieldNumber name="pay_first" label="Cọc" control={control} sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextFieldNumber name="pay_second" label="Nợ" control={control} sx={{ width: "100%" }} />
                </Grid>
                <Grid item xs={12}>
                    {fpdetails.length > 0 &&
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>STT</TableCell>
                                        <TableCell >Danh mục</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                        <TableCell >Giá</TableCell>
                                        <TableCell >VAT</TableCell>
                                        <TableCell >Tổng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {fpdetails.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell >{row.category.name}</TableCell>
                                            <TableCell >{row.qty}</TableCell>
                                            <TableCell >{<NumericFormat value={row.price_sell} thousandSeparator={true} displayType="text" />}</TableCell>
                                            <TableCell >{row.category.tax_percent}</TableCell>
                                            <TableCell >{<NumericFormat value={(parseInt(row.price_sell)* parseInt(row.qty)) + ((parseInt(row.price_sell)* parseInt(row.qty)) * (parseInt((row.category.tax_percent).replace(/%/g, '')) / 100))} thousandSeparator={true} displayType="text" />}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
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
                    <Button
                        color="fourth"
                        variant="contained"
                        sx={{ ml: 2 }}
                        onClick={() => {
                            navigate('/admin/debts');
                        }}
                    >
                        Trở lại
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DebtForm;
