import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Divider, Grid, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFormik, { TextFieldNumberAuto } from 'components/FormElement/TextFormik';
import BasicSelect from 'components/FormElement/SelectBox';
import { TableCellStyled, WrapperBox, WrapperBoxItem } from '../style/StyledFP';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { TextFieldNumber } from 'components/FormElement';
import { NumericFormat } from 'react-number-format';
import FPTotal from './FPTotal';
import { ROUND } from '@formulajs/formulajs';
import UploadFile from 'components/Common/UploadFile';
import FPUploadFile from './FPUploadFile';
import { WrapperBoxAlign } from 'components/Common/SlytedComponent/Wrapper';
import { useNavigate } from 'react-router-dom';
import FPInvoice from './FPInvoice';
import { selectStatus } from '../fpSlice';
import { useSelector } from 'react-redux';
import BasicDatePicker from 'components/FormElement/DatetimePicker';

FPForm.propTypes = {
  initialValue: PropTypes.object,
  onSubmit: PropTypes.func,
};

function FPForm({
  initialValue,
  onSubmit,
  onCallContactAPi,
  itemValue,
  accountValue,
  contactValue,
  categoriesValues,
  suppliersValues,
  usersValues,
  isEdit,
  disabled
}) {
  const status = useSelector(selectStatus);
  const validationRules = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id: yup.string().required('Xin hãy chọn tài khoản'),
    user_assign: yup.string().required('Xin hãy chọn danh mục'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({
          category_id: yup.string().required('Xin hãy chọn danh muc'),
          supplier_id: yup.string().required('Xin hãy chọn nhà cung cấp'),
        }),
      ),
    ),
  };

  const validationRulesExtra = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id: yup.string().required('Xin hãy chọn tài khoản'),
    user_assign: yup.string().required('Xin hãy chọn danh mục'),
    number_invoice: yup.string().required('Xin hãy chọn số hóa đơn'),
    date_invoice: yup.string().required('Xin hãy chọn ngày hóa đơn'),
    date_shipping: yup.string().required('Xin hãy chọn ngày giao hàng'),
    file_customer_invoice: yup.string().required('Xin hãy up hợp đồng hóa đơn'),
    file_company_receipt: yup.string().required('Xin hãy up hợp đồng với Khách hàng'),
    file_bbbg: yup.string().required('Xin hãy up biên bản bàn giao'),
    file_ncc: yup.string().required('Xin hãy up hợp đồng NCC'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({
          category_id: yup.string().required('Xin hãy chọn danh muc'),
          supplier_id: yup.string().required('Xin hãy chọn nhà cung cấp'),
          number_invoice: yup.string().required('Xin hãy chọn số hóa đơn'),
          date_invoice: yup.string().required('Xin hãy chọn ngày hóa đơn'),
        }),
      ),
    ),
  };
  const navigate = useNavigate();
  const schema = yup.object().shape(parseInt(status) < 4 ? validationRules : validationRulesExtra);

  const selectorStatus = useSelector(selectStatus);
  const [totalBuy, setTotalsBuy] = React.useState(0);
  const [totalSell, setTotalsSell] = React.useState(0);
  const [totalBids, setTotalsBids] = React.useState(0);


  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    getValues,
    setError,
    reset,
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'details',
    rules: {
      required: true,
    },
  });

  const handleFormSubmit = async (formValues) => {
    if (!onSubmit) return;
    formValues.net_profit = totalBids;
    formValues.net_profit_percent = ((parseInt(totalBids) / parseInt(totalSell)) * 100).toFixed(2);
    formValues.total_sell = totalSell;
    delete formValues.status;
    //console.log(formValues)
    await onSubmit(formValues);
  };

  const handleTotalPrice = (shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost) => {
    const totalPrice = totalPriceSell(getValues('details')) - totalPriceBuy(getValues('details'));
    const totalBids =
      totalPrice - shipping_charges - guest_costs - deployment_costs - interest - commission - tax - bids_cost;

    setTotalsBids(totalBids);
  };

  const handleFPUpdatePrice = (price_buy, price_sell, qty, profit, index) => {
    price_buy = parseFloat(price_buy.replace(/,/g, ''));
    price_sell = parseFloat(price_sell.replace(/,/g, ''));

    // fomula price sell
    let priceSell = ROUND(price_buy / (1 - toDecimal(profit)), -3);

    if (getValues(`details[${index}].price_buy`).toString() === '0') {
      priceSell = getValues(`details[${index}].price_sell`).toString().replace(/,/g, '');
    }
    setValue(`details[${index}].price_sell`, priceSell);

    if (price_buy !== '') setValue(`details[${index}].total_buy`, qty * price_buy);
    if (price_sell !== '') setValue(`details[${index}].total_sell`, qty * priceSell);
    if (price_buy !== '') setTotalsBuy(totalPriceBuy(getValues('details')));
    let totalSell = totalPriceSell(getValues('details'));
    if (price_sell !== '') setTotalsSell(totalSell);
    setValue(
      'shipping_charges_percent',
      ((parseFloat(getValues('shipping_charges').toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2),
    );
    setValue(
      'guest_costs_percent',
      ((parseFloat(getValues('guest_costs').toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2),
    );
    setValue(
      'deployment_costs_percent',
      ((parseFloat(getValues('deployment_costs').toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2),
    );
    setValue('interest', Math.round((getValues('interest_percent') * totalSell) / 100));
    setValue('bids_cost', Math.round((getValues('bids_cost_percent').toString().replace(/%/g, '') / 100) * totalSell));
    setValue(
      'commission',
      Math.round((getValues('commission_percent').toString().replace(/%/g, '') / 100) * totalSell),
    );
    setValue(
      'tax',
      Math.round(Math.round((getValues('commission_percent').toString().replace(/%/g, '') / 100) * totalSell) * 0.2),
    );

    const shipping_charges = getValues('shipping_charges').toString().replace(/,/g, '');
    const guest_costs = getValues('guest_costs').toString().replace(/,/g, '');
    const deployment_costs = getValues('deployment_costs').toString().replace(/,/g, '');
    const interest = getValues('interest').toString().replace(/,/g, '');
    const commission = getValues('commission').toString().replace(/,/g, '');
    const tax = getValues('tax').toString().replace(/,/g, '');
    const bids_cost = getValues('bids_cost').toString().replace(/,/g, '');

    handleTotalPrice(shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost);
  };

  const handleCallAPIContact = async (formValue) => {
    if (!onCallContactAPi) return;
    setValue('contact_id', '');
    await onCallContactAPi(formValue);
  };
  React.useEffect(() => {
    if (isEdit) {
      if (Object.keys(itemValue).length !== 0) {
        reset(itemValue);
      }
    }
  }, [itemValue, reset]);


  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextFormik name="name" disabled={disabled} label="Tên phương án kinh doanh" control={control} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect name="user_assign" disabled={disabled} label="Gán cho" control={control} options={usersValues} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect
            name="account_id"
            label="Tài khoản"
            control={control}
            options={accountValue}
            onChangeAjax={handleCallAPIContact}
            disabled={disabled}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect name="contact_id" label="Liên hệ" control={control} options={contactValue} disabled={disabled} />
        </Grid>
        <Grid item xs={12}>
          <WrapperBox>
            <TableContainer  >
              <Table aria-label="simple table">
                <TableBody>
                  {fields.map((field, index) => (
                    <React.Fragment key={field.id}>
                      <TableRow >
                        <TableCellStyled>
                          <BasicSelect
                            name={`details[${index}].category_id`}
                            label="Danh mục"
                            control={control}
                            options={categoriesValues}
                            sx={{ minWidth: '250px' }}
                            disabled={disabled}
                          />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumberAuto
                            name={`details[${index}].qty`}
                            label="Số lượng"
                            control={control}
                            sx={{ minWidth: '80px' }}
                            onValueChange={(v) => {
                              let price_buy = getValues(`details[${index}].price_buy`).toString();
                              let price_sell = getValues(`details[${index}].price_sell`).toString();
                              let profit = getValues(`details[${index}].profit`);
                              handleFPUpdatePrice(price_buy, price_sell, v.value, profit, index);
                            }}
                            disabled={disabled}
                          />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumber
                            name={`details[${index}].price_buy`}
                            label="Giá mua"
                            sx={{ width: '120px' }}
                            control={control}
                            disabled={disabled}
                            onValueChange={(v) => {
                              let qty = getValues(`details[${index}].qty`);
                              let profit = getValues(`details[${index}].profit`);
                              let price_sell = getValues(`details[${index}].price_sell`).toString();
                              let priceBuy = "0";
                              if (v.value !== '') priceBuy = v.value;
                              handleFPUpdatePrice(priceBuy, price_sell, qty, profit, index);
                            }}
                          />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumber name={`details[${index}].total_buy`} sx={{ width: '180px' }} label="Tổng giá mua" control={control} disabled={disabled} />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumber
                            name={`details[${index}].price_sell`}
                            label="Giá bán"
                            sx={{ minWidth: '120px' }}
                            control={control}
                            disabled={disabled}
                            onValueChange={(v) => {
                              let qty = getValues(`details[${index}].qty`);
                              setValue(`details[${index}].total_sell`, qty * parseFloat(v.value.replace(/,/g, '')));
                              let totalSell = totalPriceSell(getValues('details'));
                              setTotalsSell(totalSell);

                              setValue(
                                'shipping_charges_percent',
                                (
                                  (parseFloat(getValues('shipping_charges').toString().replace(/,/g, '')) / totalSell) *
                                  100
                                ).toFixed(2),
                              );
                              setValue(
                                'guest_costs_percent',
                                (
                                  (parseFloat(getValues('guest_costs').toString().replace(/,/g, '')) / totalSell) *
                                  100
                                ).toFixed(2),
                              );
                              setValue(
                                'deployment_costs_percent',
                                (
                                  (parseFloat(getValues('deployment_costs').toString().replace(/,/g, '')) / totalSell) *
                                  100
                                ).toFixed(2),
                              );
                              setValue('interest', Math.round((getValues('interest_percent') * totalSell) / 100));
                              setValue(
                                'bids_cost',
                                Math.round(
                                  (getValues('bids_cost_percent').toString().replace(/%/g, '') / 100) * totalSell,
                                ),
                              );
                              setValue(
                                'commission',
                                Math.round(
                                  (getValues('commission_percent').toString().replace(/%/g, '') / 100) * totalSell,
                                ),
                              );
                              setValue(
                                'tax',
                                Math.round(
                                  Math.round(
                                    (getValues('commission_percent').toString().replace(/%/g, '') / 100) * totalSell,
                                  ) * 0.2,
                                ),
                              );

                              const shipping_charges = getValues('shipping_charges').toString().replace(/,/g, '');
                              const guest_costs = getValues('guest_costs').toString().replace(/,/g, '');
                              const deployment_costs = getValues('deployment_costs').toString().replace(/,/g, '');
                              const interest = getValues('interest').toString().replace(/,/g, '');
                              const commission = getValues('commission').toString().replace(/,/g, '');
                              const tax = getValues('tax').toString().replace(/,/g, '');
                              const bids_cost = getValues('bids_cost').toString().replace(/,/g, '');

                              handleTotalPrice(
                                shipping_charges,
                                guest_costs,
                                deployment_costs,
                                interest,
                                commission,
                                tax,
                                bids_cost,
                              );
                            }}
                          />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumber name={`details[${index}].total_sell`} sx={{ width: '180px' }} label="Tổng giá bán" control={control} disabled={disabled} />
                        </TableCellStyled>
                        <TableCellStyled>
                          <TextFieldNumber
                            disabled={disabled}
                            suffix={'%'}
                            name={`details[${index}].profit`}
                            label="Lợi nhuận"
                            control={control}
                            sx={{ minWidth: '90px' }}
                            onValueChange={(v) => {
                              let qty = getValues(`details[${index}].qty`);
                              let price_sell = getValues(`details[${index}].price_sell`).toString();
                              let price_buy = getValues(`details[${index}].price_buy`).toString();
                              let profit = 0;
                              if (v.value !== '') profit = v.value;
                              handleFPUpdatePrice(price_buy, price_sell, qty, profit, index);
                            }}
                          />
                        </TableCellStyled>
                        <TableCellStyled>
                          <BasicSelect
                            name={`details[${index}].supplier_id`}
                            label="Nhà cung cấp"
                            control={control}
                            options={suppliersValues}
                            sx={{ minWidth: '250px' }}
                            disabled={disabled}
                          />
                        </TableCellStyled>

                        <TableCellStyled colSpan={2}>
                          {' '}
                          <UploadFile
                            control={control}
                            name={`details[${index}].file`}
                            setValue={setValue}
                            isEdit={isEdit}
                            field={field}
                            index={index}
                          />
                        </TableCellStyled>
                        {(isEdit && (parseInt(selectorStatus) !== 0 && parseInt(selectorStatus) !== 1 && parseInt(selectorStatus) !== 2)) &&

                          (<><TableCellStyled>
                            <TextFormik
                              name={`details[${index}].number_invoice`}
                              label="Số hóa đơn"
                              control={control}
                              sx={{ minWidth: '120px' }}
                            />
                          </TableCellStyled>
                            <TableCellStyled>
                              <BasicDatePicker
                                name={`details[${index}].date_invoice`}
                                lableText="Ngày xuất hóa đơn"
                                control={control}
                                sx={{ minWidth: '200px' }}
                              />


                            </TableCellStyled>
                          </>
                          )
                        }

                        <TableCellStyled>
                          {(index !== 0 && !disabled) && (
                            <BasicButtonStyled
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => {
                                remove(index);
                                let price_buy = getValues(`details[0].price_buy`).toString();
                                let price_sell = getValues(`details[0].price_sell`).toString();
                                let profit = getValues(`details[0].profit`);
                                let qty = getValues(`details[0].qty`);
                                handleFPUpdatePrice(price_buy, price_sell, qty, profit, 0);
                              }}
                            >
                              <DeleteOutlineIcon fontSize="small" />
                            </BasicButtonStyled>
                          )}
                        </TableCellStyled>
                      </TableRow>

                    </React.Fragment>
                  ))}
                  <TableRow>
                    <TableCellStyled colSpan={3}>
                      <Typography variant="subtitle2">Tổng ( Mua/ Bán)</Typography>{' '}
                    </TableCellStyled>

                    <TableCellStyled>
                      <NumericFormat
                        displayType="text"
                        value={totalBuy}
                        thousandSeparator=","
                        renderText={(value) => <b>{value}</b>}
                      />
                    </TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled>
                      {' '}
                      <NumericFormat
                        displayType="text"
                        value={totalSell}
                        thousandSeparator=","
                        renderText={(value) => <b>{value}</b>}
                      />
                    </TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                    <TableCellStyled></TableCellStyled>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            {!disabled && <Button
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              onClick={() => {
                append({
                  supplier_id: '',
                  category_id: '',
                  qty: 1,
                  price_buy: 0,
                  price_sell: '',
                  profit: '10',
                  file: '',
                  file_url: '',
                });
              }}
            >
              {' '}
              Thêm{' '}
            </Button>}

          </WrapperBox>
          <Grid container spacing={0} sx={isEdit ? { justifyContent: 'space-between' } : { justifyContent: 'flex-end' }}>
            <WrapperBoxItem>
              {isEdit && <FPUploadFile control={control} setValue={setValue} isEdit={isEdit} itemValue={itemValue} errors={errors} setError={setError} />}
              {(isEdit && (parseInt(selectorStatus) !== 0 && parseInt(selectorStatus) !== 1 && parseInt(selectorStatus) !== 2)
              ) && <FPInvoice control={control} setValue={setValue} isEdit={isEdit} itemValue={itemValue} />}
            </WrapperBoxItem>
            <FPTotal
              control={control}
              totalSell={totalSell}
              totalBuy={totalBuy}
              getValues={getValues}
              setValue={setValue}
              TotalPrice={handleTotalPrice}
              totalBids={totalBids}
              disabled={disabled}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <WrapperBoxAlign isborder={false} align={'center'}>
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
                navigate('/admin/fps');
              }}
            >
              Trở lại
            </Button>
          </WrapperBoxAlign>
        </Grid>
      </Grid>
    </Box>
  );
}

export function totalPriceBuy(arrPrice, name) {
  if (arrPrice.length === 0) return 0;

  return arrPrice.reduce((total, item) => {
    return total + item.total_buy;
  }, 0);
}

export function totalPriceSell(arrPrice, name) {
  if (arrPrice.length === 0) return 0;

  return arrPrice.reduce((total, item) => {
    return total + item.total_sell;
  }, 0);
}

export function roundNumber(rnum, rlength) {
  return Math.floor(Math.pow(10, 2) * rnum + 0.5) * Math.pow(10, -2);
}

function toDecimal(percent) {
  return parseFloat(percent) / 100;
}
export default FPForm;
