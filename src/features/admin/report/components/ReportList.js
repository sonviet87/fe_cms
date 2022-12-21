import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TablePaginationActions } from 'components/Common/TablePaginationActions';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';


export default function ReportList({ list, pagination, filter, onFilter }) {

  const navigate = useNavigate();


  const handleChangePage = (event, newPage) => {
    onFilter({
      page: newPage + 1,
    });

  };

  const handleChangeRowsPerPage = (event) => {
    onFilter({
      page: 0,
      per_page: parseInt(event.target.value, 10),
    });
  };





  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Công ty</TableCell>

            <TableCell>Tài khoản</TableCell>
            <TableCell>Sale phụ trách</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Mã số thuế</TableCell>
            <TableCell>Điện thoại</TableCell>

            <TableCell>Email</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 &&
            list.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell component="th">
                  <Link to={'/admin/suppliers/' + row.id}>
                    {row.company}
                  </Link>
                </TableCell>
                <TableCell>{row.account}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell>{row.address}</TableCell>


                <TableCell>{row.mst} </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>

              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={8}
              count={pagination.total}
              rowsPerPage={filter.per_page}
              page={pagination.current_page ? pagination.current_page - 1 : 0}
              labelRowsPerPage={"Số dòng trên trang"}
              labelDisplayedRows={
                ({ from, to, count }) => {
                  return '' + from + '-' + to + ' của ' + count + ' dòng'
                }
              }
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>

    </TableContainer>
  )
}
