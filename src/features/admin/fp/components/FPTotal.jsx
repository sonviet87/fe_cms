import { Grid, Table, TableBody, TableContainer, TableRow } from '@mui/material';

import BasicSelect from 'components/FormElement/SelectBox';
import { TextFieldNumber } from 'components/FormElement/TextFormik';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';
import { totalPriceSell } from './FPForm';

// import { Container } from './styles';

function FPTotal({ control, totalBuy, totalSell, setValue, getValues, TotalPrice, totalBids }) {
    const monthInterest = useWatch({
        control,
        name: "interest_percent",
    });


    const handleTotalPrice = (shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost) => {

        TotalPrice(shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost);
    }


    return <WrapperBox sx={{ mt: 4 }}>

        {console.log(totalSell)}
        <Grid item xs={12} md={12}>
            <TableContainer >
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Lãi gộp:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <NumericFormat displayType="text" value={totalSell - totalBuy} thousandSeparator="," renderText={(value) => <b>{value}</b>} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                {totalSell && (((totalSell - totalBuy) / totalSell) * 100).toFixed(2)}%

                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí Vận chuyển:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="shipping_charges" control={control}
                                    onValueChange={(v) => {
                                        setValue("shipping_charges_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalPriceSell(getValues('details'))) * 100).toFixed(2));
                                        const guest_costs = getValues("guest_costs").toString().replace(/,/g, '');
                                        const deployment_costs = getValues("deployment_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const commission = getValues("commission").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');
                                        const bids_cost = getValues("bids_cost").toString().replace(/,/g, '');
                                        handleTotalPrice(v.value.toString().replace(/,/g, ''), guest_costs, deployment_costs, interest, commission, tax, bids_cost);
                                    }}
                                />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="shipping_charges_percent" control={control} displayType="text" suffix={'%'} />
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí tiếp khách:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="guest_costs" control={control}
                                    onValueChange={(v) => {
                                        setValue("guest_costs_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalPriceSell(getValues('details'))) * 100).toFixed(2))
                                        const shipping_charges = getValues("shipping_charges").toString().replace(/,/g, '');
                                        const deployment_costs = getValues("deployment_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const commission = getValues("commission").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');
                                        const bids_cost = getValues("bids_cost").toString().replace(/,/g, '');
                                        handleTotalPrice(shipping_charges, v.value.toString().replace(/,/g, ''), deployment_costs, interest, commission, tax, bids_cost);
                                    }}
                                />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="guest_costs_percent" control={control} displayType="text" suffix={'%'} />
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí triển khai :
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="deployment_costs" control={control}
                                    onValueChange={(v) => {

                                        setValue("deployment_costs_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalPriceSell(getValues('details'))) * 100).toFixed(2))
                                        const shipping_charges = getValues("shipping_charges").toString().replace(/,/g, '');
                                        const guest_costs = getValues("guest_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const commission = getValues("commission").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');
                                        const bids_cost = getValues("bids_cost").toString().replace(/,/g, '');
                                        handleTotalPrice(shipping_charges, guest_costs, v.value.toString().replace(/,/g, ''), interest, commission, tax, bids_cost);
                                    }}
                                />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="deployment_costs_percent" control={control} displayType="text" suffix={'%'} />
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                <BasicSelect
                                    name="interest_percent"
                                    label="Lãi/ tháng"
                                    control={control}
                                    options={[
                                        { name: '0 tháng', id: 0 },
                                        { name: '1 tháng', id: 1 },
                                        { name: '2 tháng', id: 2 },
                                        { name: '3 tháng', id: 3 },
                                    ]}
                                    onChangeAjax={(e) => {
                                        setValue("interest", Math.round((e * totalSell) / 100))
                                        const shipping_charges = getValues("shipping_charges").toString().replace(/,/g, '');
                                        const guest_costs = getValues("guest_costs").toString().replace(/,/g, '');
                                        const deployment_costs = getValues("deployment_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const commission = getValues("commission").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');
                                        const bids_cost = getValues("bids_cost").toString().replace(/,/g, '');
                                        handleTotalPrice(shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost);
                                    }}

                                />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="interest" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                {monthInterest + "%"}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí HH:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="commission" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="commission_percent" control={control} suffix={'%'}
                                    onValueChange={(v) => {

                                        const commission = Math.round(((v.value.toString().replace(/%/g, '')) / 100) * totalPriceSell(getValues('details')));
                                        setValue("commission", commission)
                                        setValue("tax", Math.round(commission * 0.2))
                                        const shipping_charges = getValues("shipping_charges").toString().replace(/,/g, '');
                                        const guest_costs = getValues("guest_costs").toString().replace(/,/g, '');
                                        const deployment_costs = getValues("deployment_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');
                                        const bids_cost = getValues("bids_cost").toString().replace(/,/g, '');
                                        handleTotalPrice(shipping_charges, guest_costs, deployment_costs, interest, v.value.toString().replace(/,/g, ''), tax, bids_cost);
                                    }}
                                    sx={{ width: '60px' }}
                                />
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Thuế thu nhập 20%:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="tax" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                20%
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí đấu thầu 10% :

                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="bids_cost" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="bids_cost_percent" control={control} suffix={'%'}
                                    onValueChange={(v) => {
                                        const bids_cost = Math.round(((v.value.toString().replace(/%/g, '')) / 100) * totalPriceSell(getValues('details')));
                                        setValue("bids_cost", bids_cost);

                                        const shipping_charges = getValues("shipping_charges").toString().replace(/,/g, '');
                                        const guest_costs = getValues("guest_costs").toString().replace(/,/g, '');
                                        const deployment_costs = getValues("deployment_costs").toString().replace(/,/g, '');
                                        const interest = getValues("interest").toString().replace(/,/g, '');
                                        const commission = getValues("commission").toString().replace(/,/g, '');
                                        const tax = getValues("tax").toString().replace(/,/g, '');

                                        handleTotalPrice(shipping_charges, guest_costs, deployment_costs, interest, commission, tax, bids_cost);

                                    }}
                                    sx={{ width: '60px' }}
                                />
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Lãi :

                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <NumericFormat displayType="text" value={totalBids} thousandSeparator="," renderText={(value) => <b>{value}</b>} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                {((parseInt(totalBids) / parseInt(totalSell) * 100)).toFixed(2)}%
                            </TableCellStyled>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </WrapperBox>
}

export default FPTotal;

