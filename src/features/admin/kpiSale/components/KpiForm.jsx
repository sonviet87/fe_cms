import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";
import {DIVIDE,MULTIPLY,ROUND,ADD,MINUS} from '@formulajs/formulajs';
function KpiForm({ list,selectedTypeKpi }) {
    const data = list?.target_kpi;
    const [total,setTotal] = useState(0);
    const changeBackgroudTitle = (kpiType) => {
        let  color = '3527a0';
        switch (kpiType) {
            case 1: color = '3527a0'; break;
            case 3: color = '28A831'; break;
            case 12: color = 'b8bb0d'; break;
        }
        return color;
    }
    const totalAchievements = (percent = 0, point = 0) => {
        return ROUND(MULTIPLY(DIVIDE(percent,100),point),2);
    }

    const calculateTotal = (obj) => {
        let total = 0;

        const calculate = (percentage, point) => {
            if (!isNaN(percentage) && !isNaN(point)) {
                return (parseFloat(percentage) / 100) * parseFloat(point);
            }
            return 0;
        };

        const iterate = (value) => {
            if (Array.isArray(value)) {
                // Nếu là mảng, lặp qua từng phần tử
                value.forEach(item => iterate(item));
            } else if (typeof value === "object" && value !== null) {
                // Nếu là object, kiểm tra và tính toán
                if (value.percentage && value.point) {
                    total += calculate(value.percentage, value.point);
                }
                // Lặp qua các key của object
                Object.values(value).forEach(item => iterate(item));
            }
        };

        iterate(obj);
        return total;
    };




    React.useEffect(() => {
        //setTotal( ROUND(ADD(ADD(totalAchievements(data?.sale_achievements?.percentage,data?.sale_achievements?.point),totalAchievements(data?.current_sale_achievements?.percentage,data?.current_sale_achievements?.point)),totalAchievements(data?.debts_kpi?.percentage,data?.debts_kpi?.point)),2))
    });

    return (
        <Box sx={{mt:3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <WrapperBox>
                        <TitleBackGroundStyled background={changeBackgroudTitle(selectedTypeKpi)} sx={{mb:1}}>Đạt tiêu chí đánh giá {selectedTypeKpi} tháng</TitleBackGroundStyled>
                        <Grid container spacing={2}>

                            <Grid item xs={2} >
                                <div></div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>Mục tiêu</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>Kết quả</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>Phần trăm</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>Điểm</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>Thành tích</div>
                            </Grid>


                            <Grid item xs={2} >
                                <div>Doanh Thu Mới</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.target_sale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.total_selling}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={2}>
                                {data?.sale_achievements?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {data?.sale_achievements?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(data?.sale_achievements?.percentage,data?.sale_achievements?.points)}
                            </Grid>




                            <Grid item xs={2} >
                                <div>Doanh số hiện hữu </div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.target_current_sale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{ <NumericFormat
                                    displayType="text"
                                    value={data?.total_selling}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</div>
                            </Grid>
                            <Grid item xs={2}>
                                {data?.current_sale_achievements?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {data?.current_sale_achievements?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(data?.current_sale_achievements?.percentage,data?.current_sale_achievements?.points)}
                            </Grid>




                            <Grid item xs={2} >
                                <div>Thu hồi công nợ</div>
                            </Grid>
                            <Grid item xs={2}>
                                Trễ hạn
                            </Grid>
                            <Grid item xs={2}>
                               Tổng:{data?.debts_kpi?.total_debts} / trễ hạn:  {data?.debts_kpi?.debts_late}
                            </Grid>

                            <Grid item xs={2}>
                                {data?.debts_kpi?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {data?.debts_kpi?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(data?.debts_kpi?.percentage,data?.debts_kpi?.points)}
                            </Grid>





                        </Grid>
                        { data?.staff_manager.length > 0 &&
                            <>
                            <Divider sx={{mt:2,mb:2}}  />
                            <Grid container spacing={2}>
                                <Grid item xs={2} >
                                    <div>Quản lý nhân viên  </div>
                                </Grid>
                            </Grid>


                            <Divider sx={{mt:2,mb:2}}  />
                            <Grid container spacing={2}>

                                {data?.staff_manager.map((manager, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={2} >
                                            <div>Nhân viên {manager?.user_name}  </div>
                                        </Grid>
                                        <Grid item xs={2}>

                                        </Grid>
                                        <Grid item xs={2}>
                                            <div>{manager?.total_percent}%</div>
                                        </Grid>
                                        <Grid item xs={2}>
                                            {manager?.kpi?.percentage}%
                                        </Grid>
                                        <Grid item xs={2}>
                                            {manager?.kpi?.points}
                                        </Grid>
                                        <Grid item xs={2}>
                                            {totalAchievements(manager?.kpi?.percentage,manager?.kpi?.points)}
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                            </>
                        }
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                               Tổng
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={2}>
                                {data?.total_percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {data?.total_points}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{ fontWeight:'bold' }}>
                                {data?.total_achievements}
                                </span>
                            </Grid>
                        </Grid>
                        {data?.kpi_company != null &&
                            <>
                                <Divider sx={{mt:2,mb:2}}  />
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <div>Doanh thu công ty</div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div>Mục tiêu</div>
                                    </Grid>
                                    <Grid item xs={2}>
                                        Điểm
                                    </Grid>
                                    <Grid item xs={2}>
                                        Thành tích công ty

                                    </Grid>
                                    <Grid item xs={2}>
                                        Hệ Số thưởng tháng
                                    </Grid>
                                    <Grid item xs={2}>


                                    </Grid>

                                    <Grid item xs={2}>
                                        { <NumericFormat
                                            displayType="text"
                                            value={data?.total_selling_year}
                                            thousandSeparator=","
                                            renderText={(value) => <b>{value}</b>}
                                        />}
                                    </Grid>
                                    <Grid item xs={2}>
                                        { <NumericFormat
                                            displayType="text"
                                            value={data?.target_kpi_company}
                                            thousandSeparator=","
                                            renderText={(value) => <b>{value}</b>}
                                        />}
                                    </Grid>
                                    <Grid item xs={2}>
                                        { <NumericFormat
                                            displayType="text"
                                            value={data?.kpi_company?.points}
                                            thousandSeparator=","
                                            renderText={(value) => <b>{value}</b>}
                                        />}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <b>{data?.kpi_company?.name}</b>
                                    </Grid>
                                    <Grid item xs={2}>
                                        { <NumericFormat
                                            displayType="text"
                                            value={data?.kpi_company?.bonus}
                                            thousandSeparator=","
                                            renderText={(value) => <b>{value}</b>}
                                        />}
                                    </Grid>
                                    <Grid item xs={2}>

                                    </Grid>
                                    <Grid item xs={2}>

                                    </Grid>

                                </Grid>
                            </>
                        }
                        <Divider sx={{mt:2,mb:2}}  />
                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                Lương
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={2}>
                                Điểm
                            </Grid>
                            <Grid item xs={2}>
                                Thành tích cá nhân

                            </Grid>
                            <Grid item xs={2}>
                                Hệ Số thưởng tháng
                            </Grid>
                            <Grid item xs={2}>
                                Thưỏng

                            </Grid>

                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={data?.salary}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>



                            </Grid>
                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={data?.sale_setting_total?.points}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>
                                <b>{data?.sale_setting_total?.name}</b>
                            </Grid>
                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={data?.sale_setting_total?.bonus}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>
                                {<NumericFormat
                                    displayType="text"
                                    value={data?.total_all_bouns}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />
                                    }
                            </Grid>
                            <Grid item xs={2}>


                            </Grid>

                        </Grid>


                    </WrapperBox>

                </Grid>

            </Grid>
        </Box>
    );
}

export default KpiForm;