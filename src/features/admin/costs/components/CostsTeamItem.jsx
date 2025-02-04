import React from 'react';
import {useFieldArray,useWatch} from "react-hook-form";
import {Box, Button, Table, TableBody, TableContainer, TableRow, TextField} from "@mui/material";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import {
    BasicSelectSmall,
    TextFieldNumberSmall,
    TextFiledSmall
} from "../../../../components/FormElement";

import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import {NumericFormat} from "react-number-format";
import {useSelector} from "react-redux";
import {selectListUser} from "../../user/userSlice";
import userApi from "../../../../api/userAPI";



function CostsTeamItem({ control, name ,getValues,setValue,percent,costs_fixed}) {
    costs_fixed = costs_fixed === undefined? 0: costs_fixed;
    const users = useSelector(selectListUser);
    const { fields, append, remove } = useFieldArray({
        control,
        name,
        rules: {
            required: true,
        },
    });

    const watchedFields = useWatch({
        control,
        name,
    });

    const calculateTotals = (key) => {
       return watchedFields?.reduce((acc, field) => acc + (parseFloat(field?.[key].toString().replace(/,/g, '')) || 0), 0) || 0;
    };

    const totalSalary = calculateTotals("salary_12");
    const totalInsurance = calculateTotals("insurance");
    const totalTravel = calculateTotals("travel");
    const totalMonthlyBonus = calculateTotals("monthly_bonus");
    const totalQuarterlyBonus = calculateTotals("quarterly_bonus");
    const totalYearBonus = calculateTotals("year_bonus");
    const totalHumanCost = calculateTotals("human_cost");

    const totalSale = calculateTotals("sale");
    const profitSale = ((percent/100)*totalSale);
    const totalCosts = parseFloat(costs_fixed.toString().replace(/,/g, '')) + totalHumanCost
    const netProfit = profitSale - totalCosts;
    const tax = netProfit*0.2;
    const realProfit = netProfit - tax;
    const percentProfit =((realProfit/totalSale)*100).toFixed(2);
    const handleGetUserInfo = async (user_id,index) =>{
        const data = await userApi.get(user_id);
        const userInfo = data?.data?.data;
        setValue(`${name}[${index}].level`,userInfo.level );
        setValue(`${name}[${index}].user_name`,userInfo.name );
        setValue(`${name}[${index}].salary`,userInfo.salary );
        setValue(`${name}[${index}].salary_12`,userInfo.salary * 12 );
        setValue(`${name}[${index}].proportion`,'' );
        setValue(`${name}[${index}].sale`,'' );
    }

    const handleProportion = (value,index) =>{
        const totalSalary =  getValues(`${name}[${index}].salary_12`);
        const sale = parseFloat(value.value) * parseFloat(totalSalary);
        setValue(`${name}[${index}].sale`,sale)
    }




    return (
        <WrapperBox>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                <b>Chi phí vận hành</b>
                            </TableCellStyled>
                        </TableRow>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <TableRow>
                                    <TableCellStyled>
                                        <BasicSelectSmall name={`${name}[${index}].user_id`} onChangeAjax={(e) => handleGetUserInfo(e, index)} label="Gán cho" control={control} options={users} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFiledSmall name={`${name}[${index}].level`} label="Cấp lương" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].salary`} label="Lương 1 tháng" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].salary_12`} label="Lương 12 tháng" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].insurance`} label="Bảo hiểm" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].travel`} label="Du lịch" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].monthly_bonus`} label="Thưởng tháng" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].quarterly_bonus`} label="Thưởng quý" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].year_bonus`} label="Thưởng năm" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall
                                            name={`${name}[${index}].human_cost`}
                                            label="Chi phí con người"
                                            control={control}

                                            sx={{ width: "100%" }}

                                        />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall onValueChange={(e) => handleProportion(e, index)} name={`${name}[${index}].proportion`} label="Tỷ lệ" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberSmall name={`${name}[${index}].sale`} label="Doanh thu" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <BasicButtonStyled
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => {
                                                remove(index);
                                            }}
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </BasicButtonStyled>
                                    </TableCellStyled>
                                </TableRow>
                            </React.Fragment>
                        ))}

                        <TableRow>
                            <TableCellStyled colSpan={3}>
                                <b>Tổng cộng</b>
                            </TableCellStyled>
                            <TableCellStyled>
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalSalary}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >
                            <b>
                                { <NumericFormat
                                    displayType="text"
                                    value={totalInsurance}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </b>
                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalTravel}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalMonthlyBonus}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalQuarterlyBonus}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalYearBonus}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalHumanCost}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled >

                            </TableCellStyled>
                            <TableCellStyled >
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalSale}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                color="sixth"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={() => {
                    append();
                }}
                size="small"
            >
                {' '}
                Thêm{' '}
            </Button>
            <Box component="section" sx={{ p: 2, border: '1px dashed grey',mt:5 }}>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCellStyled colSpan={6} >
                                <b> Doanh thu</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6} sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={totalSale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                               Lợi nhuận bán hàng
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}>
                                { <NumericFormat
                                    displayType="text"
                                    value={profitSale}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                Chi phi con người
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}>
                                { <NumericFormat
                                    displayType="text"
                                    value={totalHumanCost}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
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
                            <TableCellStyled colSpan={6}>
                                <b>Tổng chi phí vận hành</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6} sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={totalCosts }
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}

                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                Lợi nhuận thuần
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}>
                                { <NumericFormat
                                    displayType="text"
                                    value={netProfit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                  Thuế
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}>
                                { <NumericFormat
                                    displayType="text"
                                    value={tax}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                <b> Lợi nhuận sau thuế</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6}  sx={{color:'red'}}>
                                { <NumericFormat
                                    displayType="text"
                                    value={realProfit}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}
                            </TableCellStyled>
                        </TableRow>
                        <TableRow>
                            <TableCellStyled colSpan={6}>
                                 <b>%</b>
                            </TableCellStyled>
                            <TableCellStyled colSpan={6} sx={{color:'red'}}>
                                <b>{percentProfit} %</b>
                            </TableCellStyled>
                        </TableRow>
                    </TableBody>
                </TableContainer>
            </Box>

        </WrapperBox>
    );
}


export default CostsTeamItem;