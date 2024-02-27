import { Grid, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';
import UploadFile from 'components/Common/UploadFile';
import UploadMuitiFile from 'components/Common/UploadMuitiFile';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsEdit } from '../fpSlice';
import { TableCellStyled, WrapperBox } from '../style/StyledFP';

function FPUploadFile({ control, name, setValue, itemValue, errors, setError }) {
  const isEdit = useSelector(selectIsEdit)
  return (
    <WrapperBox sx={{ mt: 4 }}>
      <Grid item xs={12} md={12}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <Typography>Hóa đơn gửi cho khách hàng</Typography>
                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <UploadFile
                    control={control}
                    name="file_customer_invoice"
                    setValue={setValue}
                    isEdit={isEdit}
                    field={{ file: itemValue?.file_customer_invoice, file_url: itemValue?.file_customer_invoice_url }}
                    index={name}
                    setError={setError}
                    errors={errors}
                  />


                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <Typography>Hợp đồng với Khách hàng </Typography>
                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <UploadFile
                    control={control}
                    name="file_company_receipt"
                    setValue={setValue}
                    isEdit={isEdit}
                    field={{ file: itemValue?.file_company_receipt, file_url: itemValue?.file_company_receipt_url }}
                    index={name}
                    setError={setError}
                    errors={errors}
                  />

                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <Typography>Biên bản bàn giao</Typography>
                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <UploadFile
                    control={control}
                    name="file_bbbg"
                    setValue={setValue}
                    isEdit={isEdit}
                    field={{ file: itemValue?.file_bbbg, file_url: itemValue?.file_bbbg_url }}
                    index={name}
                    setError={setError}
                    errors={errors}
                  />

                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <Typography>Hợp đồng NCC</Typography>
                </TableCellStyled>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCellStyled component="th" scope="row">
                  <UploadMuitiFile
                    control={control}
                    name="file_ncc"
                    setValue={setValue}
                    isEdit={isEdit}
                    field={itemValue.file_ncc}
                    index={name}
                    setError={setError}
                    errors={errors}
                  />

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
