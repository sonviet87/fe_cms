import { Chip, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { TablePaginationActions } from 'components/Common/TablePaginationActions';
import { BasicButtonStyled } from 'components/Common/SlytedComponent/Button';
import ConfirmDialog from 'components/Common/ConfirmDialog';

export default function AccountList({ list, pagination, filter, onFilter, onDelete }) {

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
      title: 'Notification',
      message: `Are you sure to delete this user <strong>${row.name}</strong>!`,
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
            <TableCell>Tên</TableCell>
            <TableCell>Điện thoại</TableCell>
            <TableCell>Địa chỉ</TableCell>
            <TableCell>Tên pháp lý</TableCell>
            <TableCell>Địa chỉ pháp lý</TableCell>
            <TableCell>industry</TableCell>

            <TableCell align="right">hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.length > 0 &&
            list.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell component="th">
                  <Link to={'/admin/users/' + row.id}>
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.address}</TableCell>


                <TableCell> {row.legal_name} </TableCell>
                <TableCell>{row.legal_address}</TableCell>
                <TableCell> {row.industry} </TableCell>

                <TableCell
                  align="right"

                  style={{ minWidth: '130px' }}
                >
                  <BasicButtonStyled
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate('/admin/accounts/' + row.id)}
                  >
                    <EditIcon fontSize="small" />
                  </BasicButtonStyled>
                  <BasicButtonStyled
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleOpenConfirmDeleteDialog(row)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </BasicButtonStyled>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={pagination.total}
              rowsPerPage={filter.per_page}
              page={pagination.current_page ? pagination.current_page - 1 : 0}
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
