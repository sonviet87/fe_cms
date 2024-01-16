import React from 'react';
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox, WrapperBoxAlign} from "../../../../components/Common/SlytedComponent/Wrapper";
import LoadingButton from "@mui/lab/LoadingButton";

function KpiForm({ initialValue, onSubmit, itemValue, isEdit,methods }) {

    return (
        <Box sx={{mt:4}}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <WrapperBox>
                        <TitleBackGroundStyled background='4527a0' sx={{mb:1}}>Đạt tiêu chí đánh giá tháng</TitleBackGroundStyled>
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <div>Đạt LN Với YC</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>100%</div>
                            </Grid>


                            <Grid item xs={4} >
                                <div>Đạt  KPI</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>91% - 100%</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>Lợi nhuận</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>1380000</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>70%</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>Khách hàng mới</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>1</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>20%</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>Công nợ</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>Đạt</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>10%</div>
                            </Grid>
                        </Grid>
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>

                            <Grid item xs={4} >
                                <div>% thưởng</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>10%</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div> Thưởng</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>138000</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div> Lợi nhuận thuần</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>1010000</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>% lợi nhuận thuần</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>73.33%</div>
                            </Grid>
                        </Grid>
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>
                            <Grid item xs={4} >
                                <div>Tổng lương Tháng</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>230000</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>Thường Tháng</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>1380000</div>
                            </Grid>

                            <Grid item xs={4} >
                                <div>Tổng </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div></div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>368000</div>
                            </Grid>

                        </Grid>


                    </WrapperBox>

                </Grid>
            </Grid>
        </Box>
    );
}

export default KpiForm;