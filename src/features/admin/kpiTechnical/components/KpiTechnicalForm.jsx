import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";
import {DIVIDE,MULTIPLY,ROUND,ADD,MINUS} from '@formulajs/formulajs';
function KpiTechnicalForm({ list,selectedTypeKpi }) {

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


    console.log(list)

    React.useEffect(() => {

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
                                <div>Thi chứng chỉ cho CTY</div>
                            </Grid>
                            <Grid item xs={2}>
                                Đạt được chứng chỉ của partner đúng thời gian

                            </Grid>
                            <Grid item xs={2}>
                                <div>Tổng: {list?.technical_certificate?.technical_summary?.total}</div>
                                <div>Đạt: {list?.technical_certificate?.technical_summary?.goals_2}</div>
                                <div>Không đạt : {list?.technical_certificate?.technical_summary?.goals_1}</div>
                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_certificate?.technical_certificate_condition?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_certificate?.technical_certificate_condition?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(list?.technical_certificate?.technical_certificate_condition?.percentage,list?.technical_certificate?.technical_certificate_condition?.points)}
                            </Grid>




                            <Grid item xs={2} >
                                <div>Triển khai dự án </div>
                            </Grid>
                            <Grid item xs={2}>
                                Triển khai dự án đúng thời hạn, chất lượng cam kết

                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_project?.project_points }
                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_project?.project_certificate_condition?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_project?.project_certificate_condition?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(list?.technical_project?.project_certificate_condition?.percentage,list?.technical_project?.project_certificate_condition?.points)}
                            </Grid>




                            <Grid item xs={2} >
                                <div>Chất lượng dịch vụ chăm só khách hàng</div>
                            </Grid>
                            <Grid item xs={2}>
                                Chăm sóc khách hàng với chất lượng và dịch vụ tốt nhất

                            </Grid>
                            <Grid item xs={2}>
                               {list?.technical_review?.review_points}
                            </Grid>

                            <Grid item xs={2}>
                                {list?.technical_review?.review_certificate_condition?.percentage}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.technical_review?.review_certificate_condition?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(list?.technical_review?.review_certificate_condition?.percentage,list?.technical_review?.review_certificate_condition?.points)}
                            </Grid>





                        </Grid>

                        { list?.technical_staff_manager.length > 0 &&
                            <>
                                <Divider sx={{mt:2,mb:2}}  />
                                <Grid container spacing={2}>
                                    <Grid item xs={2} >
                                        <div>Quản lý nhân viên  </div>
                                    </Grid>
                                </Grid>


                                <Divider sx={{mt:2,mb:2}}  />
                                <Grid container spacing={2}>

                                    {list?.technical_staff_manager.map((manager, index) => (
                                        <React.Fragment key={index}>
                                            <Grid item xs={2} >
                                                <div>Nhân viên {manager?.user_name}  </div>
                                            </Grid>
                                            <Grid item xs={2}>

                                            </Grid>
                                            <Grid item xs={2}>
                                                <div>{manager?.total_points}</div>
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
                                {list?.total_percent}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.total_points}
                            </Grid>
                            <Grid item xs={2}>
                                <b>{list?.total_achievement}</b>
                            </Grid>
                        </Grid>
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
                                    value={list?.total_selling_year}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={list?.target_company}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={list?.kpi_company?.points}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>
                                <b>{list?.kpi_company?.name}</b>
                            </Grid>
                            <Grid item xs={2}>
                                { <NumericFormat
                                    displayType="text"
                                    value={list?.kpi_company?.bonus}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={2}>

                            </Grid>

                        </Grid>
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
                                    value={list?.salary}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </Grid>
                            <Grid item xs={2}>

                            </Grid>
                            <Grid item xs={2}>
                                { list?.kpi_personnal?.points }
                            </Grid>
                            <Grid item xs={2}>
                                <b>{ list?.kpi_personnal?.name }</b>
                            </Grid>
                            <Grid item xs={2}>
                                <b>{ list?.kpi_personnal?.bonus }</b>
                            </Grid>
                            <Grid item xs={2}>
                                {<NumericFormat
                                    displayType="text"
                                    value={list?.totalBouns}
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

export default KpiTechnicalForm;