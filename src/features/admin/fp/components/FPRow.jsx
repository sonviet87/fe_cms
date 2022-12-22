import { UploadFile } from '@mui/icons-material';
import { Collapse, TableRow } from '@mui/material';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import { TextFieldNumber, TextFieldNumberAuto } from 'components/FormElement';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import BasicSelect from 'components/FormElement/SelectBox';
import TextFormik from 'components/FormElement/TextFormik';
import React from 'react';
import { TableCellStyled } from '../style/StyledFP';
import { totalPriceSell } from './FPForm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function FPRow({ index, control, field, disabled, getValues, setValue, remove, handleFPUpdatePrice, setTotalsSell, categoriesValues, handleTotalPrice, isEdit, suppliersValues }) {
    return (
        <React.Fragment >
            <TableRow >
                <TableCellStyled>
                    <BasicSelect
                        name={`details[${index}].category_id`}
                        label="Danh mục"
                        control={control}
                        options={categoriesValues}
                        sx={{ width: '250px' }}
                        disabled={disabled}
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
                        sx={{ width: '120px' }}
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
                        sx={{ width: '90px' }}
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
                        sx={{ width: '250px' }}
                        disabled={disabled}
                    />
                </TableCellStyled>
                <TableCellStyled>
                    <BasicButtonStyled >toggle</BasicButtonStyled>
                </TableCellStyled>

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
            <Collapse>
                <TableRow>
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
                    <TableCellStyled>
                        <TextFormik
                            name={`details[${index}].number_invoice`}
                            label="Số hóa đơn"
                            control={control}
                            sx={{ width: '120px' }}
                        />
                    </TableCellStyled>
                    <TableCellStyled>
                        <BasicDatePicker
                            name={`details[${index}].date_invoice`}
                            lableText="Ngày xuất hóa đơn"
                            control={control}
                            sx={{ width: '200px' }}
                        />
                    </TableCellStyled>
                </TableRow>
            </Collapse>
        </React.Fragment>
    );
}

export default FPRow;