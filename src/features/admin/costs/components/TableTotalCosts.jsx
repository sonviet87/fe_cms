import React from 'react';
import {Box, Table, TableBody, TableContainer, TableHead, TableRow} from "@mui/material";
import {TableCellStyled} from "../../fp/style/StyledFP";
import {NumericFormat} from "react-number-format";
import {ROUND} from '@formulajs/formulajs';
function TableTotalCosts({total_sale,profit_sale,total_human_costs,costs_fixed,total_costs,net_profit,tax,real_profit,percent_profit,isMonths=false,percent,title,background='#0dae99'}) {
    if(isMonths){
        total_sale = ROUND(parseFloat(total_sale)/ 12,2);
        profit_sale =  ((percent/100)*parseFloat(total_sale));
        total_human_costs = ROUND(parseFloat(total_human_costs)/ 12,2);
        costs_fixed =  ROUND(parseFloat(costs_fixed)/ 12,2);
        total_costs = costs_fixed + total_human_costs;
        net_profit = profit_sale - total_costs;
        tax = net_profit*0.2;
        real_profit = net_profit - tax;
        percent_profit = (real_profit/total_sale).toFixed(2);

    }

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey',mt:5 }}>
            <TableContainer >
                <Table sx={{ width: '100%' }} aria-label="customized table">
                    <TableHead sx={{background:background,color:'#fff'}}>
                        <TableRow>
                            <TableCellStyled  colSpan={2}  sx={{color:'#fff'}}>
                                <b> {title}</b>
                            </TableCellStyled>

                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                            <TableCellStyled >
                                <b> Doanh thu</b>
                            </TableCellStyled>
                            <TableCellStyled sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={total_sale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                Lợi nhuận bán hàng
                            </TableCellStyled>
                            <TableCellStyled >
                                { <NumericFormat
                                    displayType="text"
                                    value={profit_sale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                Chi phi con người
                            </TableCellStyled>
                            <TableCellStyled >
                                { <NumericFormat
                                    displayType="text"
                                    value={total_human_costs}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                Chi phí chung
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}>
                                { <NumericFormat
                                    displayType="text"
                                    value={costs_fixed}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                <b>Tổng chi phí vận hành</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6} sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={total_costs }
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                Lợi nhuận thuần
                            </TableCellStyled>
                            <TableCellStyled c>
                                { <NumericFormat
                                    displayType="text"
                                    value={net_profit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                Thuế
                            </TableCellStyled>
                            <TableCellStyled >
                                { <NumericFormat
                                    displayType="text"
                                    value={tax}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                <b> Lợi nhuận sau thuế</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}  sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={real_profit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled >
                                <b>%</b>
                            </TableCellStyled>
                            <TableCellStyled  sx={{color:'red'}}>
                                <b>{percent_profit} %</b>
                            </TableCellStyled>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default TableTotalCosts;