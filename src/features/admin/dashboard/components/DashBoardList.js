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
        let temp = 'T???t c???';
        switch (text) {
            case '1': temp = "C??ng ty th??nh vi??n";
                break;
            case '2': temp = "T??i x???";
                // code block
                break;
            case '3': temp = "L??i su???t ng??n h??ng";

                break;
            case '4': temp = "Ph?? ng??n h??ng";

                break;
            case '5': temp = "Kh??c";

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
                        <StyledTableCell align="center" rowSpan={2}>Ng??y gi???</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Ph??n lo???i</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>Tr??? s??? ch??nh</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>?????i l??</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>C??ng ty th??nh vi??n</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Ph??n lo???i t??i kho???n</StyledTableCell>
                        <StyledTableCell align="center" colSpan={2}>T??i kho???n</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>R??t ti???n</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>N???p ti???n</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>Ghi ch??</StyledTableCell>
                        <StyledTableCell align="center" rowSpan={2}>N???i dung</StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell align="center">M??</StyledTableCell>
                        <StyledTableCell align="center">T??n tr??? s??? ch??nh</StyledTableCell>
                        <StyledTableCell align="center">M??</StyledTableCell>
                        <StyledTableCell align="center">?????i l??</StyledTableCell>
                        <StyledTableCell align="center">M??</StyledTableCell>
                        <StyledTableCell align="center">C??ng ty th??nh vi??n</StyledTableCell>
                        <StyledTableCell align="center">S??? t??i kho???n</StyledTableCell>
                        <StyledTableCell align="center">T??n t??i x???</StyledTableCell>
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
                            rowsPerPageOptions={[5, 10, 25, { label: 'T???t c???', value: -1 }]}
                            colSpan={15}
                            count={pagination.total}
                            rowsPerPage={filter.per_page}
                            page={pagination.current_page ? pagination.current_page - 1 : 0}
                            labelRowsPerPage={"S??? ph???n t??? tr??n trang"}
                            labelDisplayedRows={
                                ({ from, to, count }) => {
                                    return '' + from + '-' + to + ' c???a ' + count + ' d??ng'
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