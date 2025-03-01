import React from 'react';
import {useFieldArray} from "react-hook-form";
import {Box, Button} from "@mui/material";
import KpiConditionsStaff from "./KpiConditionsStaff";
import {BasicButtonStyled} from "../../../../components/Common/SlytedComponent/Button";

function StaffForm({methods,users,name,type}) {
    const { control } = methods;
    const { fields, append, remove } = useFieldArray({
        control,
        name: name,
    });
    const handleAddStaffMonth = () => {
        append({
            user_id: "",
            percent: "",
            //staff_conditions: [],
        });
    };
    return (
        <>
            {fields.map((field, index) => (
                <Box key={field.id} sx={{ mb: 2, border: "1px solid #ddd", padding: 2 }}>
                    <KpiConditionsStaff
                        name={`${name}[${index}]`}
                        control={control}
                        type={type}
                        users={users}

                    />
                    <BasicButtonStyled
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => remove(index)}
                    >
                        Xóa nhân viên
                    </BasicButtonStyled>
                </Box>
            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStaffMonth}
                sx={{ mt: 2 }}
            >
                Thêm nhân viên
            </Button>
        </>
    );
}

export default StaffForm;