import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

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