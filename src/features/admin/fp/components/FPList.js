import { Chip, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TablePaginationActions } from 'components/Common/TablePaginationActions';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import ConfirmDialog from 'components/Common/ConfirmDialog';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import ChipStatus from 'components/Common/Element/Chip';
import { fpPermissions } from '../constants/FPConstants';
import { selectRoles } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';

export default function FPList({ list, pagination, filter, onFilter, onDelete }) {
  const permissions = useSelector(selectRoles)
  const navigate = useNavigate();
  const [confirmDeleteDialogData, setConfirmDeleteDialogData] = React.useState({
    title: '',
    message: '',
    open: false,
    deleteItem: null,
  });

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

  const handleOpenConfirmDeleteDialog = (row) => {
    setConfirmDeleteDialogData({
      title: 'Cảnh báo',
      message: `Bạn có chắc sẽ xóa <strong>${row.name} ?</strong>!`,
      open: true,
      deleteItem: row,
    });
  };

  const handleCloseConfirmDeleteDialog = () => {
    setConfirmDeleteDialogData({
      title: '',
      message: '',
      open: false,
      deleteItem: null,
    });
  };

  const handleAcceptConfirmDeleteDialog = () => {
    handleCloseConfirmDeleteDialog();
    if (!onDelete) return;
    onDelete(confirmDeleteDialogData.deleteItem);
  };
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên FP</TableCell>
            <TableCell>Tài khoản</TableCell>
            <TableCell>Liên hệ</TableCell>
            <TableCell>Gán cho</TableCell>
            <TableCell>Tình trạng</TableCell>
            <TableCell>Tổng giá bán</TableCell>
            <TableCell>Lợi nhuận</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell align="right">hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 &&
            list.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.code}</TableCell>
                <TableCell component="th">
                  <Link to={'/admin/fps/' + row.id}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell>{row.account}</TableCell>
                <TableCell>{row.contact}</TableCell>


                <TableCell>{row.user_assign} </TableCell>
                <TableCell> <ChipStatus label={row.status} status={row.statusNumber} /></TableCell>
                <TableCell>
                  {<NumericFormat
                    displayType="text"
                    value={row.selling}
                    thousandSeparator=","
                    renderText={(value) => <b>{value}</b>}
                  />}
                </TableCell>
                <TableCell>
                  {<NumericFormat
                    displayType="text"
                    value={row.margin}
                    thousandSeparator=","
                    renderText={(value) => <b>{value}</b>}
                  />}
                </TableCell>
                <TableCell>{moment(row.created_at).format('DD-MM-YYYY')}</TableCell>
                <TableCell
                  align="right"

                  style={{ minWidth: '130px' }}
                >
                  <BasicButtonStyled
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate('/admin/fps/' + row.id)}
                  >
                    <EditIcon fontSize="small" />
                  </BasicButtonStyled>

                  {(!permissions.includes(fpPermissions.FP_IS_SALE) ) &&
                    <BasicButtonStyled
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleOpenConfirmDeleteDialog(row)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </BasicButtonStyled>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={10}
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
      <ConfirmDialog
        title={confirmDeleteDialogData.title}
        message={confirmDeleteDialogData.message}
        open={confirmDeleteDialogData.open}
        onClose={handleCloseConfirmDeleteDialog}
        onConfirm={handleAcceptConfirmDeleteDialog}
      />
    </TableContainer>
  )
}
