import { Grid, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import BasicSelect from 'components/FormElement/SelectBox';
import TextFormik, { TextFieldNumber } from 'components/FormElement/TextFormik';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';

// import { Container } from './styles';

function FPTotal({ control, totalBuy, totalSell, setValue }) {
    const monthInterest = useWatch({
        control,
        name: "interest_percent",
    });
    return <WrapperBox sx={{ mt: 4 }}>

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
                                {totalSell && (((totalSell - totalBuy) / totalSell) * 100).toFixed(0)}%
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí Vận chuyển:
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="shipping_charges" control={control}
                                    onValueChange={(v) => {
                                        setValue("shipping_charges_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2))
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
                                        setValue("guest_costs_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2))
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
                                        setValue("deployment_costs_percent", ((parseFloat(v.value.toString().replace(/,/g, '')) / totalSell) * 100).toFixed(2))
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
                                        const commission = Math.round(((v.value.toString().replace(/%/g, '')) / 100) * totalSell);
                                        setValue("commission", commission)
                                        setValue("tax", Math.round(commission * 0.2))
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
                                <TextFormik name="total" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                37.43%
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Lãi :

                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">

                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                37.43%
                            </TableCellStyled>
                        </TableRow>


                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    </WrapperBox>
}

export default FPTotal;