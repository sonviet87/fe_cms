import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {Box, IconButton} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        // backgroundColor: theme.palette.primary.main,
        // color: theme.palette.common.white,
        border: '1px solid #d1d1d1'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}))

export const StyledTableCellRow = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        border: '1px solid #d1d1d1'
    },
}))

export  const WrapperBox = styled(Box) (({ theme }) => ({
    position: "relative",
    backgroundColor: "white",
    borderRadius: "8px",
}))
export const IconWrapper = styled(IconButton)({
    position: "absolute",
    top: 20,
    right: 20,
});
