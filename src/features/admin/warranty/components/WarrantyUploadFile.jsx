import { Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { WrapperBox } from 'components/Common/SlytedComponent/Wrapper';
import UploadMuitiFile from 'components/Common/UploadMuitiFile';
import React from 'react';


function WarrantyUploadFile({ control, name, setValue, itemValue, errors, setError, isEdit }) {

  return (
    <WrapperBox sx={{ mt: 4 }}>
      <Grid item xs={12} md={12}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography>Biên bản xử lý</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <UploadMuitiFile
                    control={control}
                    name="file_warranty"
                    setValue={setValue}
                    isEdit={isEdit}
                    field={itemValue.file_ncc}
                    index={name}
                    setError={setError}
                    errors={errors}
                  />

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </WrapperBox>
  );
}

export default WarrantyUploadFile;
