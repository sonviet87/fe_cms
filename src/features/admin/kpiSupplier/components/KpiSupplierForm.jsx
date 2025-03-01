import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {Box, Divider, Grid} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";
import {DIVIDE,MULTIPLY,ROUND,ADD,MINUS} from '@formulajs/formulajs';
function KpiSupplierForm({ list,selectedTypeKpi }) {

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
                                <div>Nhà cung cấp mới</div>
                            </Grid>
                            <Grid item xs={2}>
                                {list?.new_supplier_target}

                            </Grid>
                            <Grid item xs={2}>
                               {list?.new_supplier}
                            </Grid>
                            <Grid item xs={2}>
                                {list?.new_supplier_percent}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.new_supplier_conditions?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(list?.new_supplier_percent,list?.new_supplier_conditions?.points)}
                            </Grid>




                            <Grid item xs={2} >
                                <div> Nhà cung cấp cũ tăng công nợ</div>
                            </Grid>
                            <Grid item xs={2}>

                                {list?.old_supplier_target }
                            </Grid>
                            <Grid item xs={2}>
                                {list?.old_increase_supplier }
                            </Grid>
                            <Grid item xs={2}>
                                {list?.old_supplier_percent}%
                            </Grid>
                            <Grid item xs={2}>
                                {list?.old_increase_supplier_conditions?.points}
                            </Grid>
                            <Grid item xs={2}>
                                {totalAchievements(list?.old_supplier_percent,list?.old_increase_supplier_conditions?.points)}
                            </Grid>


                        </Grid>

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
                                    value={list?.total_bouns}
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

export default KpiSupplierForm;