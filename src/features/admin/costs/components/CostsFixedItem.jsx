import React from 'react';
import {useFieldArray,useWatch} from "react-hook-form";
import {Button, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import {TextFieldNumber} from "../../../../components/FormElement";
import TextFormik from "../../../../components/FormElement/TextFormik";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import {NumericFormat} from "react-number-format";


function CostsFixedItem({ control, name }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
        rules: {
            required: true,
        },
    });

    // Theo dõi sự thay đổi của toàn bộ dữ liệu trong `name`
    const watchedFields = useWatch({
        control,
        name,
    });

    // Tính tổng giá trị dựa trên dữ liệu hiện tại
    const calculateTotals = (key) => {
        console.log(watchedFields);
        return watchedFields?.reduce((acc, field) => acc + (parseFloat(field?.[key].replace(/,/g, '')) || 0), 0) || 0;
    };

    const totalPrice = calculateTotals("price"); // Tổng giá
    const totalTotal = calculateTotals("total"); // Tổng tổng

    return (
        <WrapperBox>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableBody>
                        <TableRow>
                            <TableCellStyled colSpan={4}>
                                <b>Chi phí vận hành</b>
                            </TableCellStyled>
                        </TableRow>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <TableRow>
                                    <TableCellStyled>
                                        <TextFormik name={`${name}[${index}].name`} label="Mục" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].price`} label="Giá" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].months`} label="Tháng" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].total`} label="Tổng" control={control} sx={{ width: "100%" }} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        {index !== 0 && (
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
                                        )}
                                    </TableCellStyled>
                                </TableRow>
                            </React.Fragment>
                        ))}
                        <TableRow>
                            <TableCellStyled colSpan={1}>
                                <b>Tổng cộng</b>
                            </TableCellStyled>
                            <TableCellStyled>
                                <b>
                                    { <NumericFormat
                                        displayType="text"
                                        value={totalPrice}
                                        thousandSeparator=","
                                        renderText={(value) => <b>{value}</b>}
                                    />}
                                </b>
                            </TableCellStyled>
                            <TableCellStyled />
                            <TableCellStyled>

                                <b> { <NumericFormat
                                    displayType="text"
                                    value={totalTotal}
                                    thousandSeparator=","
                                    renderText={(value) => <b>{value}</b>}
                                />}</b>
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
                    append({
                        name: "",
                        price: "",
                        months: "",
                        total: "",
                    });
                }}
                size="small"
            >
                {' '}
                Thêm{' '}
            </Button>
        </WrapperBox>
    );
}


export default CostsFixedItem;