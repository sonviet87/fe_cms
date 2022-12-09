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
import { ROUND } from '@formulajs/formulajs';

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
}) {
  const validationRules = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id: yup.string().required('Xin hãy chọn tài khoản'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({
          category_id: yup.string().required('Xin hãy chọn danh muc'),
          supplier_id: yup.string().required('Xin hãy chọn nhà cung cấp'),
        }),
      ),
    ),
  };

  const schema = yup.object().shape(validationRules);

  const [totalBuy, setTotalsBuy] = React.useState(0);
  const [totalSell, setTotalsSell] = React.useState(0);
  const [totalBids, setTotalsBids] = React.useState(0);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    getValues,
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
    // console.log(formValues)


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
          <TextFormik name="name" label="Tên FP" control={control} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect name="user_assign" label="Gán cho" control={control} options={usersValues} />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect
            name="account_id"
            label="Tài khoản"
            control={control}
            options={accountValue}
            onChangeAjax={handleCallAPIContact}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BasicSelect name="contact_id" label="Liên hệ" control={control} options={contactValue} />
        </Grid>
        <Grid item xs={12}>
          <WrapperBox>
            <TableContainer>
              <Table aria-label="simple table">
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
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
                          label="Số lượng"
                          control={control}
                          sx={{ width: '80px' }}
                          onValueChange={(v) => {
                            let price_buy = getValues(`details[${index}].price_buy`).toString();
                            let price_sell = getValues(`details[${index}].price_sell`).toString();
                            let profit = getValues(`details[${index}].profit`);
                            handleFPUpdatePrice(price_buy, price_sell, v.value, profit, index);
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
                            let profit = getValues(`details[${index}].profit`);
                            let price_sell = getValues(`details[${index}].price_sell`).toString();
                            handleFPUpdatePrice(v.value, price_sell, qty, profit, index);
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
                        <TextFieldNumber name={`details[${index}].total_sell`} label="Tổng giá bán" control={control} />
                      </TableCellStyled>
                      <TableCellStyled>
                        <TextFieldNumber
                          suffix={'%'}
                          name={`details[${index}].profit`}
                          label="Lợi nhuận"
                          control={control}
                          onValueChange={(v) => {
                            let qty = getValues(`details[${index}].qty`);
                            let price_sell = getValues(`details[${index}].price_sell`).toString();
                            let price_buy = getValues(`details[${index}].price_buy`).toString();
                            handleFPUpdatePrice(price_buy, price_sell, qty, v.value, index);
                          }}
                        />
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
                        {index !== 0 && (
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
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
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
                });
              }}
            >
              {' '}
              Thêm{' '}
            </Button>
          </WrapperBox>
          <Grid container spacing={0} sx={{ justifyContent: 'flex-end' }}>
            <FPTotal
              control={control}
              totalSell={totalSell}
              totalBuy={totalBuy}
              getValues={getValues}
              setValue={setValue}
              TotalPrice={handleTotalPrice}
              totalBids={totalBids}
            />
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
