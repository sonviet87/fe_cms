import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { TablePaginationActions } from 'components/Common/TablePaginationActions';
import { StyledTableCell, StyledTableCellRow } from '../styles/StyledDashboard';
import moment from 'moment';

// function createData(name, calories, fat, carbs, protein, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10) {
//     return { name, calories, fat, carbs, protein, l1, l2, l3, l4, l5, l6, l7, l8, l9, l10 };
// }

// const rows = [
//     createData('Frozen fds', 159, 6.0, 24, 4.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Ice cresssam sandwich', 237, 9.0, 37, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Eclair', 262, 16.0, 24, 6.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Gingerfbread', 356, 16.0, 49, 3.9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Frozen555 yoghurt', 159, 6.0, 24, 4.0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4),
//     createData('Eclair', 262, 16.0, 24, 6.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Eclair', 262, 16.0, 24, 6.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4, 4, 2, 4, 4, 4, 4, 4, 4, 4),
//     createData('Eclair', 262, 16.0, 24, 6.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Eclair', 262, 16.0, 24, 6.0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Cupcake', 305, 3.7, 67, 4.3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
//     createData('Gingerbread', 356, 16.0, 49, 3.9, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4),
// ];

function DashBoardList({ list, pagination, filter, onFilter }) {
    //const [page, setPage] = React.useState(0);
    //const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const changeTypetoString = (text) => {
        let temp = 'Tất cả';
        switch (text) {
            case '1': temp = "Công ty thành viên";
                break;
            case '2': temp = "Tài xế";
                // code block
                break;
            case '3': temp = "Lãi suất ngân hàng";

                break;
            case '4': temp = "Phí ngân hàng";

                break;
            case '5': temp = "Khác";

                break;
            default:
            // code block
        }
        return temp;
    }

    const handleChangePage = (event, newPage) => {
        //setPage(newPage);
        onFilter({
            page: newPage + 1,
        });

    };

    const handleChangeRowsPerPage = (event) => {
        //setRowsPerPage(parseInt(event.target.value, 10));
        //setPage(0);
        onFilter({
            page: 0,
            per_page: parseInt(event.target.value, 10),
        });
    };


    return (
        <TableContainer component={Paper} sx={{ p: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" rowSpan={2}>Ngày giờ</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Phân loại</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>Trụ sở chính</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>Đại lý</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>Công ty thành viên</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Phân loại tài khoản</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>Tài khoản</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Rút tiền</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Nạp tiền</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Ghi chú</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Nội dung</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell align="center">Mã</StyledTableCell>
                        <StyledTableCell align="center">Tên trụ sở chính</StyledTableCell>
                        <StyledTableCell align="center">Mã</StyledTableCell>
                        <StyledTableCell align="center">Đại lý</StyledTableCell>
                        <StyledTableCell align="center">Mã</StyledTableCell>
                        <StyledTableCell align="center">Công ty thành viên</StyledTableCell>
                        <StyledTableCell align="center">Số tài khoản</StyledTableCell>
                        <StyledTableCell align="center">Tên tài xế</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.length > 0 &&
                        list.map((row) => (
                            <TableRow key={row.code_driver} >
                                <StyledTableCellRow component="th" scope="row">  {moment(row.created_at).format('DD-MM-YYYY HH:mm:ss')} </StyledTableCellRow>
                                <StyledTableCellRow align="center">{changeTypetoString(row.type_transacction)}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.mainjisa}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.namejisa}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.agencyjisa}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.nameagency}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.companyjisa}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.namecompany}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.type_account}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.code_driver}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.name_driver}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.withdraw}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.recharge}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.notes}</StyledTableCellRow>
                                <StyledTableCellRow align="center">{row.content}</StyledTableCellRow>
                            </TableRow>
                        ))}


                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'Tất cả', value: -1 }]}
                            colSpan={15}
                            count={pagination.total}
                            rowsPerPage={filter.per_page}
                            page={pagination.current_page ? pagination.current_page - 1 : 0}
                            labelRowsPerPage={"Số phần tử trên trang"}
                            labelDisplayedRows={
                                ({ from, to, count }) => {
                                    return '' + from + '-' + to + ' của ' + count + ' dòng'
                                }
                            }
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

export default DashBoardList;