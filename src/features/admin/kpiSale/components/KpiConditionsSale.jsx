import React from 'react';
import {useFieldArray} from "react-hook-form";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import {Button, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import {TextFieldNumberBase} from "../../../../components/FormElement/TextFormik";
import AddIcon from "@mui/icons-material/Add";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const KpiConditionsSale = ({control,name,type}) => {
    const { fields, append,remove } = useFieldArray({
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
                                    <TableCellStyled>
                                        <TextFieldNumberBase
                                            name={`${name}[${index}].min`}
                                            label="Từ "
                                            control={control}

                                        />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumberBase
                                            name={`${name}[${index}].max`}
                                            label="Đến "
                                            control={control}

                                        />
                                    </TableCellStyled>
                                    {/* <TableCellStyled>
                                        <TextFieldNumberBase name={`${name}[${index}].percentage`} label="Phần trăm" control={control} />
                                    </TableCellStyled>*/}
                                    <TableCellStyled>
                                        <TextFieldNumberBase name={`${name}[${index}].points`} label="Điểm" control={control} sx={{width:'50px'}} />
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
                        min:'',
                        max:'',
                        percentage: '',
                        points:'',
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

export default KpiConditionsSale;
