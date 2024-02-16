import React, {useState} from 'react';
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";
import {DIVIDE,MULTIPLY,ROUND,ADD,MINUS} from '@formulajs/formulajs';
function KpiForm({ list,selectedTypeKpi }) {
    const data = list?.target_kpi;

    const [totalGoalsProfitPercent,setTotalGoalsProfitPercent] = useState(0);
    const [totalBonus,settotalBonus] = useState(0);
    const countTargetDebtsFalse = (arr) => {

       if(arr === undefined || arr === null) return  0;
       return  arr.filter(function (element) {
            return element === 0;
       }).length

    }
    const countTargetDebtsTrue =  (arr) => {
        if(arr === undefined || arr === null) return  0;
        return  arr.filter(function (element) {
            return element !== 0;
        }).length

    }



    const totalPercentProfitMaxDefault70 = (totalMargin= 0,profitPercentTarget= 0,profitType=0 ) =>{
        return ROUND(MULTIPLY(DIVIDE(MULTIPLY(totalMargin,DIVIDE(profitPercentTarget,100)),profitType),100),2);
    }

    const totalBonusFunc = (total_profit,percentTotalSettings) => {
       // return ((total_profit * percentTotalSettings)/100).toFixed(0);
        return DIVIDE(MULTIPLY(total_profit,percentTotalSettings),100);
    }

    const totalProfitMarginFunc = (total_profit,totalSalary,revenues) => {
        return  MINUS(total_profit ,ADD(totalSalary, revenues));
    }
// const test = ROUND(MULTIPLY(DIVIDE(MULTIPLY(249014700, 0.8), 138000000),100),2);
    const changeBackgroudTitle = (kpiType) => {
        let  color = '3527a0';
        switch (kpiType) {
            case 1: color = '3527a0'; break;
            case 3: color = '28A831'; break;
            case 12: color = 'b8bb0d'; break;
        }
        return color;
    }

    React.useEffect(() => {
        if(Object.keys(list?.target_kpi).length !== 0){
            setTotalGoalsProfitPercent(totalPercentProfitMaxDefault70(data?.total_profit,data?.profit_percent_target,data?.target_profit));
            settotalBonus(totalBonusFunc(data?.total_profit, data?.percentTotalSettings));
        }
    });
    return (
        <Box sx={{mt:3}}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <WrapperBox>
                        <TitleBackGroundStyled background={changeBackgroudTitle(selectedTypeKpi)} sx={{mb:1}}>Đạt tiêu chí đánh giá {selectedTypeKpi} tháng</TitleBackGroundStyled>
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
                                <div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ (parseFloat(totalGoalsProfitPercent) + parseFloat(data?.goal_percent_customer) + parseFloat(data?.totalPercentDebuts)).toFixed(2)
                                }%</div>
                            </Grid>


                            <Grid item xs={3} >
                                <div>Đạt  KPI</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.result_kpi_goals ? (
                                    <span style={{ color: 'green' }}>Đạt</span>
                                ) : (
                                    <span style={{ color: 'red' }}>Không đạt</span>
                                )}</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.record_setting_percent !== 0  ?( <b>{data?.record_setting_percent?.min_percentage +"% - " + data?.record_setting_percent?.max_percentage+"%"} </b>) : "0%"}</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Lợi nhuận</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.target_profit}
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
                                <div>{totalGoalsProfitPercent}%</div>
                            </Grid>

                            <Grid item xs={3} >
                                <div>Khách hàng mới</div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.target_customer }</div>
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
                                <div></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>Đạt <b>{countTargetDebtsTrue(data?.debuts_percent)}</b> / Không <b>{countTargetDebtsFalse(data?.debuts_percent)}</b></div>
                            </Grid>
                            <Grid item xs={3}>
                                <div>{data?.totalPercentDebuts.toFixed(2)}%</div>
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
                                <div>{data?.percentTotalSettings}%</div>
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
                                <div>{data?.percentTotalSettings !=0? <NumericFormat
                                    displayType="text"
                                    value={totalBonus}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />: 0 }</div>
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
                                <div>{<NumericFormat
                                    displayType="text"
                                    value={totalProfitMarginFunc(data?.total_profit,data?.totalSalary,totalBonus)}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
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
                                <div>{data?.totalPercentRevenues.toFixed(2)}%</div>
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
                                <div><NumericFormat
                                    displayType="text"
                                    value={data?.totalSalary.toFixed(0)}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                /></div>
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
                                <div><div>{data?.percentTotalSettings !=0? <NumericFormat
                                    displayType="text"
                                    value={totalBonus}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />: 0 }</div></div>
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
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={(data?.totalSalary+ totalBonus).toFixed(0)}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>

                        </Grid>


                    </WrapperBox>

                </Grid>
            </Grid>
        </Box>
    );
}

export default KpiForm;