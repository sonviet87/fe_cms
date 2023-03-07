import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

import { TablePaginationActions } from 'components/Common/TablePaginationActions';

import ChipStatus from 'components/Common/Element/Chip';
import { NumericFormat } from 'react-number-format';

import { Box } from '@mui/system';


export default function ReportDebtSupplierList({ list, pagination, filter, onFilter,methods }) {

  const handleChangePage = (event, newPage) => {
    onFilter({
      page: newPage + 1,
      startDay: methods.getValues('startDay'),
      endDay: methods.getValues('endDay'),
      isDone: methods.getValues('isDone'),
      supplier_id: methods.getValues('supplier_id'),
      account_id: methods.getValues('account_id'),
      fp_id: methods.getValues('fp_id'),
      user_id: methods.getValues('user_id'),
    });

  };

  const handleChangeRowsPerPage = (event) => {
    onFilter({
      page: 0,
      per_page: parseInt(event.target.value, 10),
      startDay: methods.getValues('startDay'),
      endDay: methods.getValues('endDay'),
      isDone: methods.getValues('isDone'),
      supplier_id: methods.getValues('supplier_id'),
      account_id: methods.getValues('account_id'),
      fp_id: methods.getValues('fp_id'),
      user_id: methods.getValues('user_id'),
    });
  };

  const handleTotalFP = () => {
    if (list.length === 0) return '(Tổng PAKD: <b>0</b> / Tổng giá mua (VAT): <b>0</b> )';

    let totalVAT = 0;
    let totalFP = 0;
    list.map((item, index) => {
      totalVAT += parseInt(item.total_debt);
      totalFP++;
      return item;
    })

    return `(Tổng PAKD: <b>${totalFP}</b>   / Tổng giá mua (VAT): <b>${totalVAT.toLocaleString()}</b>)`
  }



  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Khách hàng</TableCell>

            <TableCell>Nhà cung cấp</TableCell>
            <TableCell>Sale phụ trách</TableCell>

            <TableCell>Tổng giá mua (VAT)</TableCell>

            <TableCell>Tình trạng</TableCell>



          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={9} sx={{ background: '#e3e3e3' }}>
              <Box sx={{ textAlign: 'center' }}>
                <div dangerouslySetInnerHTML={{ __html: handleTotalFP() }} />

              </Box>

            </TableCell>
          </TableRow>
          {list.length > 0 &&
            list.map((row) => (
              <TableRow key={row.id}>
                <TableCell><Link to={'/admin/debts-supplier/' + row.id} target="_blank">{row.code} </Link></TableCell>
                <TableCell>{row.fp.code}</TableCell>
                <TableCell component="th">

                  {row.fp.account}

                </TableCell>
                <TableCell>{row.supplier}</TableCell>
                <TableCell>{row.fp.user_assign_name}</TableCell>

                <TableCell>{<NumericFormat
                  displayType="text"
                  value={row.total_debt}
                  thousandSeparator=","
                  renderText={(value) => <b>{value}</b>}
                />}</TableCell>


                <TableCell><ChipStatus label={row.isDone} status={parseInt(row.isDone_number)} /></TableCell>


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
