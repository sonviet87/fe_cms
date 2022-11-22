import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik, { TextFieldNumberAuto } from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { TextFieldNumber } from 'components/FormElement';
import { NumericFormat } from 'react-number-format';
import FPTotal from './FPTotal';


FPForm.propTypes = {
    initialValue: PropTypes.object,
    onSubmit: PropTypes.func,
};

function FPForm({ initialValue, onSubmit, onCallContactAPi, itemValue, accountValue, contactValue, categoriesValues, suppliersValues, isEdit }) {
    const validationRules = {
        name: yup.string().required('Xin hãy điền tên FP'),
        // category_id: yup.string().required('Xin hãy chọn danh mục'),
    };

    const schema = yup.object().shape(validationRules);

    const [totalBuy, setTotalsBuy] = React.useState(0);
    const [totalSell, setTotalsSell] = React.useState(0);

    const { control, handleSubmit, formState: { isSubmitting, errors }, setValue, getValues } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    });

    const { fields, append, remove, prepend } = useFieldArray({
        control,
        name: "details"
    });

    const handleFormSubmit = async (formValues) => {
        if (!onSubmit) return;
        console.log(formValues)
        //await onSubmit(formValues);
    };


    const handleCallAPIContact = async (formValue) => {
        if (!onCallContactAPi) return;
        setValue('contact_id', "");
        await onCallContactAPi(formValue);
    }
    React.useEffect(() => {

        if (isEdit) {
            setValue('name', itemValue.name);
            setValue('account_id', itemValue.account_id);
            setValue('contact_id', itemValue.contact_id);
            setValue('user_id', itemValue.user_id);
            setValue('status', itemValue.status);
            setValue('selling', itemValue.selling);
            setValue('margin', itemValue.margin);
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
                <Grid item xs={12} md={12} >
                    <TextFormik name="name" label="Tên FP" control={control} />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="account_id"
                        label="Tài khoản"
                        control={control}
                        options={accountValue}
                        onChangeAjax={handleCallAPIContact}
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <BasicSelect
                        name="contact_id"
                        label="Liên hệ"
                        control={control}
                        options={contactValue}


                    />
                </Grid>
                <Grid item xs={12}>
                    <WrapperBox>
                        <TableContainer >
                            <Table aria-label="simple table">
                                <TableBody>
                                    {fields.map((field, index) => (



                                        <TableRow key={field.id} >
                                            <TableCellStyled>

                                                <BasicSelect
                                                    name={`details[${index}].category_id`}
                                                    label="Danh mục"
                                                    control={control}
                                                    options={categoriesValues}
                                                    sx={{ width: '250px' }}
                                                />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <TextFieldNumberAuto
                                                    name={`details[${index}].qty`}
                                                    label="Số lượng" control={control}
                                                    sx={{ width: '80px' }}
                                                    onValueChange={(v) => {
                                                        let price_buy = getValues(`details[${index}].price_buy`);
                                                        let price_sell = getValues(`details[${index}].price_sell`).toString();
                                                        // fomula price sell
                                                        let profit = getValues(`details[${index}].profit`);
                                                        let priceSell = (Math.round(price_sell / (1 - (toDecimal(profit)))));
                                                        setValue(`details[${index}].price_sell`, priceSell);

                                                        if (price_buy !== '') setValue(`details[${index}].total_buy`, v.value * parseFloat(price_buy.replace(/,/g, '')));
                                                        if (price_sell !== '') setValue(`details[${index}].total_sell`, v.value * parseFloat(price_sell.replace(/,/g, '')));
                                                        if (price_buy !== '') setTotalsBuy(totalPriceBuy(getValues('details')))
                                                        if (price_sell !== '') setTotalsSell(totalPriceSell(getValues('details')))
                                                    }}
                                                />

                                            </TableCellStyled>
                                            <TableCellStyled>


                                                <TextFieldNumber
                                                    name={`details[${index}].price_buy`}
                                                    label="Giá mua"
                                                    control={control}
                                                    onValueChange={(v) => {
                                                        let qty = getValues(`details[${index}].qty`);
                                                        setValue(`details[${index}].total_buy`, qty * parseFloat(v.value.replace(/,/g, '')));
                                                        // fomula price sell
                                                        let profit = getValues(`details[${index}].profit`);
                                                        let priceSell = (Math.round(parseFloat(v.value.replace(/,/g, '')) / (1 - (toDecimal(profit)))));

                                                        setValue(`details[${index}].price_sell`, priceSell);
                                                        setValue(`details[${index}].total_sell`, qty * priceSell);
                                                        setTotalsSell(totalPriceSell(getValues('details')))
                                                        setTotalsBuy(totalPriceBuy(getValues('details')))
                                                    }}
                                                />

                                            </TableCellStyled>
                                            <TableCellStyled>


                                                <TextFieldNumber name={`details[${index}].total_buy`} label="Tổng giá mua" control={control} />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <TextFieldNumber
                                                    name={`details[${index}].price_sell`}
                                                    label="Giá bán"
                                                    control={control}
                                                    onValueChange={(v) => {
                                                        let qty = getValues(`details[${index}].qty`);
                                                        setValue(`details[${index}].total_sell`, qty * parseFloat(v.value.replace(/,/g, '')));
                                                        setTotalsSell(totalPriceSell(getValues('details')))
                                                    }}
                                                />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <TextFieldNumber name={`details[${index}].total_sell`} label="Tổng giá bán" control={control} />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <TextFieldNumber suffix={'%'} name={`details[${index}].profit`} label="Lợi nhuận" control={control} />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <BasicSelect
                                                    name={`details[${index}].supplier_id`}
                                                    label="Nhà cung cấp"
                                                    control={control}
                                                    options={suppliersValues}
                                                    sx={{ width: '250px' }}
                                                />

                                            </TableCellStyled>
                                            <TableCellStyled>

                                                <BasicButtonStyled
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => remove(index)}
                                                >
                                                    <DeleteOutlineIcon fontSize="small" />
                                                </BasicButtonStyled>

                                            </TableCellStyled>
                                        </TableRow>


                                    ))}
                                    <TableRow >
                                        <TableCellStyled colSpan={3}><Typography variant="subtitle2">Tổng ( Mua/ Bán)</Typography> </TableCellStyled>

                                        <TableCellStyled><NumericFormat displayType="text" value={totalBuy} thousandSeparator="," renderText={(value) => <b>{value}</b>} /></TableCellStyled>
                                        <TableCellStyled></TableCellStyled>
                                        <TableCellStyled> <NumericFormat displayType="text" value={totalSell} thousandSeparator="," renderText={(value) => <b>{value}</b>} /></TableCellStyled>
                                        <TableCellStyled></TableCellStyled>
                                        <TableCellStyled></TableCellStyled>
                                        <TableCellStyled></TableCellStyled>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            color="primary"
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => {
                                append({
                                    supplier_id: '',
                                    category_id: '',
                                    qty: 1,
                                    price_buy: '',
                                    price_sell: '',
                                    profit: '10',
                                    text_buy: '',
                                    text_sell: ''
                                })
                            }}
                        > Thêm </Button>


                    </WrapperBox>
                    <Grid container spacing={0} sx={{ justifyContent: 'flex-end' }} >
                        <FPTotal control={control} totalSell={totalSell} totalBuy={totalBuy} />
                    </Grid>

                </Grid>


                <Grid item xs={12} md={6}>
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
        </Box >
    );
}

export function totalPriceBuy(arrPrice, name) {
    if (arrPrice.length === 0) return 0;

    return arrPrice.reduce((total, item) => {
        return total + item.total_buy;
    }, 0)
}

export function totalPriceSell(arrPrice, name) {
    if (arrPrice.length === 0) return 0;

    return arrPrice.reduce((total, item) => {
        return total + item.total_sell;
    }, 0)
}
function toDecimal(percent) {
    return parseFloat(percent) / 100;
}
export default FPForm;
