import React from 'react';
import {useFieldArray} from "react-hook-form";
import {Button, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import {TextFieldNumber} from "../../../../components/FormElement";
import TextFormik from "../../../../components/FormElement/TextFormik";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";


function ReviewItem({control,name}) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
        rules: {
            required: true,
        },
    });
    return (
        <WrapperBox>
            <TableContainer>
                <Table aria-label="simple table">

                    <TableBody>
                        <TableRow>
                            <TableCellStyled colSpan={4} > <b>Đánh giá</b></TableCellStyled>
                        </TableRow>
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <TableRow>
                                    <TableCellStyled>
                                        <TextFormik name={`${name}[${index}].name`}  label="Công việc" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFormik name={`${name}[${index}].reviews`}  label="Tiêu chí đánh giá" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].points`} label="Điểm" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFormik name={`${name}[${index}].notes`} label="Nhận xét" control={control} />
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
                        name: '',
                        reviews: '',
                        points: '',
                        notes: '',

                    });
                }}
                size="small"
            >
                {' '}
                Thêm đánh giá{' '}
            </Button>

        </WrapperBox>
    );
}

export default ReviewItem;