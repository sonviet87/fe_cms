import React from 'react';
import {useFieldArray} from "react-hook-form";
import {Button, Table, TableBody, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import AddIcon from "@mui/icons-material/Add";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SettingConditions = ({control,name,type,type_kpi='sale',isMinMax=false}) => {
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
                        {fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <TableRow>
                                    {
                                        isMinMax === true &&  (
                                            <>
                                             <TableCellStyled>
                                                <TextFieldNumber name={`${name}[${index}].min_percentage`}  label="Từ" control={control} />
                                            </TableCellStyled>
                                            <TableCellStyled>
                                            <TextFieldNumber name={`${name}[${index}].max_percentage`}  label="Đến" control={control} />
                                            </TableCellStyled>
                                            </>
                                    )}

                                    <TableCellStyled>
                                        <TextFieldNumber sx={{display:"none"}} name={`${name}[${index}].percentage`}  label="Phần trăm thưởng" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].bonus`} label="Hệ số thưởng" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].points`} label="Điểm" control={control} />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFormik name={`${name}[${index}].name`} label="Tên" control={control} />
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

                        max_percentage: '',
                        min_percentage: '',
                        point: '',
                        bonus: '',
                        name: '',
                        percentage: '',
                        type_kpi:type_kpi,
                        type
                    });
                }}
                size="small"
            >
                {' '}
                Thêm{' '}
            </Button>

        </WrapperBox>
    );
};

export default SettingConditions;

