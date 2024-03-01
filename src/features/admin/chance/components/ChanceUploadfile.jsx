import React from 'react';
import {TableCellStyled,WrapperBox} from "../../fp/style/StyledFP";
import UploadMuitiFile from "../../../../components/Common/UploadMuitiFile";
import { Grid, Table, TableBody, TableContainer, TableRow, Typography } from '@mui/material';

function ChanceUploadfile({ control, name, setValue, itemValue, errors, setError,isEdit }) {
    return (
        <WrapperBox sx={{ mt: 4 }}>
            <Grid item xs={12} md={12}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCellStyled component="th" scope="row">
                                    <UploadMuitiFile
                                        control={control}
                                        name="files"
                                        setValue={setValue}
                                        isEdit={isEdit}
                                        field={itemValue.files}
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

export default ChanceUploadfile;