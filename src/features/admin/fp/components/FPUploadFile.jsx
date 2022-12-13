import { Grid, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import UploadFile from 'components/Common/UploadFile';
import React from 'react';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';

function FPUploadFile({ control, name, setValue, isEdit, itemValue }) {
    React.useEffect(() => {
        console.log(itemValue);
    }, [itemValue]);

    return (
        <WrapperBox sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <Typography >Hóa đơn gửi cho khách hàng</Typography>
                                </TableCellStyled>

                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCellStyled component="th" scope="row">
                                    <UploadFile control={control} name="file_customer_invoice" setValue={setValue} isEdit={isEdit} field={{ name: itemValue.file_customer_invoice, url: itemValue.file_customer_invoice_url }} index={name} />
                                </TableCellStyled>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <Typography >Hóa đơn công ty</Typography>
                                </TableCellStyled>

                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCellStyled component="th" scope="row">
                                    <UploadFile control={control} name="file_company_receipt" setValue={setValue} isEdit={isEdit} field={{ name: itemValue.file_company_receipt, url: itemValue.file_company_receipt_url }} index={name} />
                                </TableCellStyled>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <Typography >Biên bản bàn giao</Typography>
                                </TableCellStyled>

                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                <TableCellStyled component="th" scope="row">
                                    <UploadFile control={control} name="file_bbbg" setValue={setValue} isEdit={isEdit} field={{ name: itemValue.file_bbbg, url: itemValue.file_bbbg_url }} index={name} />
                                </TableCellStyled>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
        </WrapperBox>
    );
}

export default FPUploadFile;