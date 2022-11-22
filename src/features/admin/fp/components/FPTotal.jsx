import { Grid, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import TextFormik, { TextFieldNumber } from 'components/FormElement/TextFormik';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';

// import { Container } from './styles';

function FPTotal({ control, totalBuy, totalSell }) {
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
                                {(((totalSell - totalBuy) / totalSell) * 100).toFixed(2)}%
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí Vận chuyển:

                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                <TextFieldNumber name="shipping_charges" control={control} />
                            </TableCellStyled>
                            <TableCellStyled component="th" scope="row">
                                37.43%
                            </TableCellStyled>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                            <TableCellStyled component="th" scope="row">
                                Chi phí tiếp khách:
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
                                Chi phí triển khai :
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
                                Lãi vay/(1 tháng):
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
                                Chi phí HH:
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
                                Thuế thu nhập 20%:
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