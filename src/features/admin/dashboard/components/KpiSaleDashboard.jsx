import React from 'react';
import {Box, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableCellStyled} from "../../fp/style/StyledFP";
import {NumericFormat} from "react-number-format";
import MonthSelector from "./SelectBoxMonths";
import {ProgressBarKpi} from "./ProgressBarKpi";

function KpiSaleDashboard({list,onSaleKpiList,selectedMonth,setSelectedMonth}) {

    return (
        <>
            <Box sx={{
                background: '#2f318f',
                color: '#fff',
                padding: '5px 10px',
                borderRadius: '5px',
                display:'flex'
            }}>
                <div> Kpi Kinh doanh </div>
                <Box sx={{marginLeft:'10px'}}><MonthSelector onSaleKpiList={onSaleKpiList} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/></Box>

            </Box>
            <TableContainer>
                <Table aria-label="simple table">

                    <TableBody>

                        <TableRow>
                            <TableCellStyled > <b>Nhân Viên</b></TableCellStyled>
                            <TableCellStyled > <b>Tiến trình</b></TableCellStyled>
                            <TableCellStyled > <b>Doanh Thu Mới</b></TableCellStyled>
                            <TableCellStyled > <b>Công nợ</b></TableCellStyled>


                            <TableCellStyled > <b>Tổng Thành tích</b></TableCellStyled>
                            <TableCellStyled > <b>Thành tích cá nhân</b></TableCellStyled>
                            <TableCellStyled > <b>Điểm</b></TableCellStyled>
                            <TableCellStyled > <b>Hệ Số thưởng tháng</b></TableCellStyled>
                        </TableRow>
                        {list.length> 0 && list.map((item) => (

                            <TableRow key={item?.user_name}>
                                <TableCellStyled > {item?.user_name}</TableCellStyled>
                                <TableCellStyled>

                                        <ProgressBarKpi currentPercentage={item?.total_percentage} targetPercentage={item?.min_bonus_setting_progress}  maxPercentage={item?.min_bonus_setting_progress} backGround1={item.bg_color1} backGround2={item.bg_color2}/>

                                </TableCellStyled>
                                <TableCellStyled >
                                    { <NumericFormat
                                        displayType="text"
                                        value={item?.total_selling}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}

                                </TableCellStyled>
                                <TableCellStyled >
                                    Tổng: {item?.debts_kpi?.total_debts} / Trễ: {item?.debts_kpi?.debts_late}

                                </TableCellStyled>

                                <TableCellStyled >
                                    <NumericFormat
                                        displayType="text"
                                        value={item?.total_achievements}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value} </b>}
                                    />

                                </TableCellStyled>
                                <TableCellStyled > <b  style={{ color: item?.sale_setting_total?.color  ? "red" : "green" }}>{item?.sale_setting_total?.name}</b> </TableCellStyled>
                                <TableCellStyled >
                                    { <NumericFormat
                                        displayType="text"
                                        value={item?.sale_setting_total?.points}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </TableCellStyled>
                                <TableCellStyled >
                                    {<NumericFormat
                                        displayType="text"
                                        value={item?.sale_setting_total?.bonus}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />
                                    }
                                </TableCellStyled>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default KpiSaleDashboard;