import { Grid, Skeleton, Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { TableCellStyled, WrapperBox } from 'features/admin/fp/style/StyledFP';
import React from 'react';

function SkeletonPageFP(props) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Skeleton animation="wave" height={60} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Skeleton animation="wave" height={60} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Skeleton animation="wave" height={60} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Skeleton animation="wave" height={60} />
            </Grid>
            <Grid item xs={12} md={12}>
                <WrapperBox>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableBody>
                                <TableRow >
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                </TableRow>
                                <TableRow >
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                    <TableCellStyled><Skeleton animation="wave" height={60} /></TableCellStyled>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Skeleton animation="wave" height={60} width={100} />
                </WrapperBox>
                <Grid container spacing={0} sx={{ justifyContent: 'space-between' }}>
                    <WrapperBox sx={{ mt: 4 }}>
                        <Grid item xs={12} md={12}>
                            <TableContainer>
                                <Table aria-label=" ">
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" width={200} />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </WrapperBox>
                    <WrapperBox sx={{ mt: 4 }}>
                        <Grid item xs={12} md={12}>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableBody>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" width={120} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} width={280} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" width={60} />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />

                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" height={60} />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                            <TableCellStyled component="th" scope="row">
                                                <Skeleton animation="wave" />
                                            </TableCellStyled>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </WrapperBox>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SkeletonPageFP;