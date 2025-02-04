import React, {useState} from 'react';
import {Box, Divider, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {TitleBackGroundStyled} from "../../../../components/Common/SlytedComponent/Title";
import {WrapperBox} from "../../../../components/Common/SlytedComponent/Wrapper";
import {NumericFormat} from "react-number-format";
import {TableCellStyled} from "../../fp/style/StyledFP";
import TableTotalCosts from "./TableTotalCosts";
function CostsForm({ list ,percent,year}) {

    const profitSale = ((percent/100)*parseFloat(list?.total_sale));
    const totalCosts = parseFloat(list?.total_human_costs) + parseFloat(list?.costs_fixed);
    const netProfit = profitSale - totalCosts;
    const tax = netProfit*0.2;
    const realProfit = netProfit - tax;
    const percentProfit =((realProfit/parseFloat(list?.total_sale))*100).toFixed(2);
    return (
        <Box sx={{mt:3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <WrapperBox>
                        <TitleBackGroundStyled background="3527a0" sx={{mb:1}}>Tổng chi phí  </TitleBackGroundStyled>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCellStyled >
                                            <b>Tên NV</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>CHỨC VỤ</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>LƯƠNG/1 THÁNG</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>12THÁNG</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Bảo Hiểm</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Du lịch</b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Thưởng tháng </b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Thưởng quý </b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Thưởng năm </b>
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            <b>Chi phí con người </b>
                                        </TableCellStyled>
                                    </TableRow>
                                    { list?.list.length > 0 &&
                                        list?.list.map((item, index) => (
                                    <TableRow>
                                        <TableCellStyled >
                                            {item.user_name}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            {item.level}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.salary}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}

                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.salary_12}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}

                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.insurance}
                                                thousandSeparator=","
                                                renderText={(value) =>value}
                                            />}

                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.travel}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.monthly_bonus}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.quarterly_bonus}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.year_bonus}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}
                                        </TableCellStyled>
                                        <TableCellStyled >
                                            { <NumericFormat
                                                displayType="text"
                                                value= {item.human_cost}
                                                thousandSeparator=","
                                                renderText={(value) => value}
                                            />}
                                        </TableCellStyled>
                                    </TableRow>
                                        ))}
                                    <TableRow>
                                        <TableCellStyled colSpan={9}></TableCellStyled>
                                        <TableCellStyled sx={{color:'green',fontSize:'18px'}} >
                                            { <NumericFormat
                                            displayType="text"
                                            value= {list?.total_human_costs}
                                            thousandSeparator=","
                                            renderText={(value) => <b>{value}</b>}
                                        />}</TableCellStyled>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container spacing={2} sx={{mt:5}}>
                            <Grid item xs={4}>
                                <TableTotalCosts total_sale ={list?.total_sale}
                                                 profit_sale ={profitSale}
                                                 total_human_costs = {list?.total_human_costs}
                                                 costs_fixed = {list?.costs_fixed}
                                                 total_costs = {totalCosts}
                                                 net_profit= {netProfit}
                                                 tax={tax}
                                                 real_profit={realProfit}
                                                 percent_profit ={percentProfit}
                                                 title={'Năm '+year.year()}
                                />

                            </Grid>
                            <Grid item xs={4}>
                                <TableTotalCosts isMonths={true}
                                                total_sale ={list?.total_sale}
                                                 profit_sale ={profitSale}
                                                 total_human_costs = {list?.total_human_costs}
                                                 costs_fixed = {list?.costs_fixed}
                                                 total_costs = {totalCosts}
                                                 net_profit= {netProfit}
                                                 tax={tax}
                                                 real_profit={realProfit}
                                                 percent_profit ={percentProfit}
                                                 percent={percent}
                                                 title={'Tháng 1'}
                                                 background='#78ae0d'
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TableTotalCosts
                                                isMonths={true}
                                                total_sale ={list?.total_sale}
                                                 profit_sale ={profitSale}
                                                 total_human_costs = {list?.total_human_costs}
                                                 costs_fixed = {list?.costs_fixed}
                                                 total_costs = {totalCosts}
                                                 net_profit= {netProfit}
                                                 tax={tax}
                                                 real_profit={realProfit}
                                                 percent_profit ={percentProfit}
                                                percent={percent}
                                                title={'Tháng 2'}
                                                background='#ae9c0d'
                                />
                            </Grid>
                        </Grid>

                    </WrapperBox>
                </Grid>

            </Grid>
        </Box>
    );
}

export default CostsForm;