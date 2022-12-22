import { Grid, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import BasicDatePicker from 'components/FormElement/DatetimePicker';
import TextFormik from 'components/FormElement/TextFormik';
import React from 'react';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';

function FPInvoice({ control }) {
    return (
        <WrapperBox sx={{ mt: 4, ml: 2 }}>
            <Grid item xs={12} md={12}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <TextFormik control={control} name="number_invoice" label="Số hóa đơn" />
                                </TableCellStyled>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <BasicDatePicker control={control} name="date_invoice" lableText="Ngày xuất hóa đơn" />
                                </TableCellStyled>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <BasicDatePicker control={control} name="date_shipping" lableText="Ngày dự kiến giao hàng" />
                                </TableCellStyled>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </WrapperBox>
    );
}

export default FPInvoice;