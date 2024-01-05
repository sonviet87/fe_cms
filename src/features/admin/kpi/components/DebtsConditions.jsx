import React from 'react';
import {useFieldArray} from "react-hook-form";
import {TableCellStyled, WrapperBox} from "../../fp/style/StyledFP";
import {Button, Table, TableBody, TableContainer, TableRow} from "@mui/material";
import TextFormik, {TextFieldNumber} from "../../../../components/FormElement/TextFormik";
import AddIcon from "@mui/icons-material/Add";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const DebtsConditions = ({control,name,type}) => {
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
                                        <TextFieldNumber
                                            name={`${name}[${index}].min_days`}
                                            label="Từ ngày"
                                            control={control}

                                        />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber
                                            name={`${name}[${index}].max_days`}
                                            label="Đến ngày"
                                            control={control}

                                        />
                                    </TableCellStyled>
                                    <TableCellStyled>
                                        <TextFieldNumber name={`${name}[${index}].percentage`} label="Phần trăm" control={control} />
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
                        min_days:'',
                        max_days:'',
                        percentage: '',
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

export default DebtsConditions;
