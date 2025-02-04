import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";
import { useController } from "react-hook-form";
import { FormHelperText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: "300px",
        },
    },
};

// Hàm tạo style cho MenuItem
function getStyles(optionName, selectedValues, theme) {
    return {
        fontWeight: selectedValues.includes(optionName)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

// Thành phần MultilSelectBox
function MultilSelectBox({
                             name,
                             label,
                             control,
                             options = [],
                             onChangeAjax,
                             onChangeValue,
                             textValue = "id",
                             textName = "name",
                             minWidth = "150px",
                             ...inputProps
                         }) {

    const {
        field: { onChange, value = [] }, // Giá trị từ react-hook-form
        fieldState: { invalid, error }, // Trạng thái lỗi
    } = useController({
        name,
        control,
    });

    const theme = useTheme();

    // Xử lý sự kiện thay đổi giá trị
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        onChange(value); // Cập nhật giá trị vào react-hook-form

        if (onChangeAjax) onChangeAjax(value); // Gọi callback nếu cần
        if (onChangeValue) onChangeValue(value); // Gọi callback nếu cần
    };

    return (
        <FormControl
            sx={{
                minWidth: minWidth,
                marginBottom: "8px",
                marginTop: "8px",
            }}
            fullWidth
            size="small"
            error={invalid}
        >
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <SlytedSelectMuitl
                labelId={`${name}-label`}
                id={`${name}-select`}
                multiple
                size="small"
                value={value} // Giá trị được quản lý bởi react-hook-form
                onChange={handleChange}
                input={<OutlinedInput id={`${name}-select-chip`} label={label} />}
                renderValue={(selected) => {
                    // Chuyển đổi giá trị ID thành tên để hiển thị
                    const selectedNames = options
                        .filter((option) => selected.includes(option[textValue]))
                        .map((option) => option[textName]);
                    return (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selectedNames.map((name) => (
                                <Chip key={name} label={name} />
                            ))}
                        </Box>
                    );
                }}
                MenuProps={MenuProps}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={option[textValue]}
                        style={getStyles(option[textName], value, theme)}
                    >
                        {option[textName]}
                    </MenuItem>
                ))}
            </SlytedSelectMuitl>
            {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
    );
}

// Custom styled component cho Select
export const SlytedSelectMuitl = styled(Select)(({ theme }) => ({
    "& .MuiSelect-select": {
        padding: "8px 14px",
    },
    margin: "0 5px",
    "& .MuiInputLabel-root": {
        top: "50%",
        left: "20px",
        transform: "translateY(-50%)",
    },
}));

export default MultilSelectBox;
