import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import { TablePaginationActions } from 'components/Common/TablePaginationActions';

import ChipStatus from 'components/Common/Element/Chip';
import { NumericFormat } from 'react-number-format';

import { Box } from '@mui/system';


export default function ReportDebtFPList({ list, pagination, filter, onFilter,methods ,sumValues}) {

  const handleChangePage = (event, newPage) => {
    onFilter({
      page: newPage + 1,
      startDay: methods.getValues('startDay'),
      endDay: methods.getValues('endDay'),
      fp_id: methods.getValues('fp_id'),
      account_id: methods.getValues('account_id'),
      isDone: methods.getValues('isDone'),
    });

  };
  const handleChangeRowsPerPage = (event) => {
    onFilter({
      page: 0,
      per_page: parseInt(event.target.value, 10),
      startDay: methods.getValues('startDay'),
      endDay: methods.getValues('endDay'),
      fp_id: methods.getValues('fp_id'),
      account_id: methods.getValues('account_id'),
      isDone: methods.getValues('isDone'),
    });
  };





  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>PAKD</TableCell>
            <TableCell>Khách hàng</TableCell>

            <TableCell>Liên hệ</TableCell>
            <TableCell>Sale phụ trách</TableCell>
            <TableCell>Tổng giá bán(Chưa VAT)</TableCell>
            <TableCell>Tổng giá bán(VAT)</TableCell>
            <TableCell>Lợi nhuận</TableCell>
            <TableCell>Tình trạng</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={9} sx={{ background: '#e3e3e3' }}>
              <Box sx={{ textAlign: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: sumValues }} />

              </Box>

            </TableCell>
          </TableRow>
          {list.length > 0 &&
            list.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row?.code}</TableCell>
                <TableCell> <Link to={'/admin/debts/' + row.id} target="_blank">{row.fp?.code} </Link></TableCell>
                <TableCell component="th">

                  {row.fp?.account}

                </TableCell>
                <TableCell>{row.fp?.contact}</TableCell>
                <TableCell>{row.fp?.user_assign_name}</TableCell>
                <TableCell>{<NumericFormat
                  displayType="text"
                  value={row.fp?.selling}
                  thousandSeparator=","
                  renderText={(value) => <b>{value}</b>}
                />}</TableCell>
                <TableCell>{<NumericFormat
                  displayType="text"
                  value={row?.total_debt}
                  thousandSeparator=","
                  renderText={(value) => <b>{value}</b>}
                />}</TableCell>

                <TableCell>{<NumericFormat
                  displayType="text"
                  value={row.fp?.margin}
                  thousandSeparator=","
                  renderText={(value) => <b>{value}</b>}
                />} </TableCell>
                <TableCell><ChipStatus label={row?.isDone} status={parseInt(row.isDone_number)} /></TableCell>


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
