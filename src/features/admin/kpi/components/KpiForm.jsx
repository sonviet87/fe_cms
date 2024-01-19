import React from 'react';
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";

function KpiForm({ list }) {
    const data = list?.target_kpi;
    return (
        <Box sx={{mt:3}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <WrapperBox>
                        <TitleBackGroundStyled background='3527a0' sx={{mb:1}}>Đạt tiêu chí đánh giá tháng</TitleBackGroundStyled>
                        <Grid container spacing={2}>
                            <Grid item xs={3} >
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>Mục tiêu</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>Kết quả</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>Phần trăm</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Đạt LN Với YC</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.target_profit_months}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.total_profit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.total_percent_profit_months.toFixed(2)}%</div>
                            </Grid>


                            <Grid item xs={3} >
                                <div>Đạt  KPI</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>91% - 100%</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Lợi nhuận</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.target_profit_months}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.total_profit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.total_percent_profit_max_70_months.toFixed(2)}%</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Khách hàng mới</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.target_customer_months }</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.total_account_new }</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.goal_percent_customer}%</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Công nợ</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>Đạt</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>10%</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>10%</div>
                            </Grid>
                        </Grid>
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>

                            <Grid item xs={3} >
                                <div>% thưởng</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>10%</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div> Thưởng</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>138000</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div> Lợi nhuận thuần</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>1010000</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>% lợi nhuận thuần</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>73.33%</div>
                            </Grid>
                        </Grid>
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>
                            <Grid item xs={3} >
                                <div>Tổng lương Tháng</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>230000</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Thường Tháng</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>1380000</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Tổng </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
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