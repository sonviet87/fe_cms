import { Button } from '@mui/material';
import fpApi from 'api/fpAPI';
import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import { selectRoles } from 'features/auth/authSlice';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fpPermissions, statusApproved } from '../constants/FPConstants';
import * as yup from 'yup';
export const FPButtonApproved = ({ status, onChangeStatus }) => {
  const navigate = useNavigate();
  const methods = useFormContext();
  const permissions = useSelector(selectRoles);
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const validationRules = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id: yup.string().required('Xin hãy chọn tài khoản'),
    user_assign: yup.string().required('Xin hãy chọn danh mục'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({

          category_id: yup.mixed()
            .test("required", "Xin hãy chọn danh muc", (item) => {
              if (item) return true;
              return false;
            }),
          supplier_id: yup.mixed().test("required", "Xin hãy chọn nhà cung cấp", (item) => {
            if (item) return true;
            return false;
          }),
        }),
      ),
    ),
  };

  const validationRulesExtra = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id: yup.string().required('Xin hãy chọn tài khoản'),
    user_assign: yup.string().required('Xin hãy chọn danh mục'),
    number_invoice: yup.string().required('Xin hãy chọn số hóa đơn'),
    date_invoice: yup.string().required('Xin hãy chọn ngày hóa đơn'),
    date_shipping: yup.string().required('Xin hãy chọn ngày giao hàng'),
    file_customer_invoice: yup.string().required('Xin hãy up hợp đồng hóa đơn'),
    file_company_receipt: yup.string().required('Xin hãy up hợp đồng với Khách hàng'),
    file_bbbg: yup.string().required('Xin hãy up biên bản bàn giao'),
    file_ncc: yup.string().required('Xin hãy up hợp đồng NCC'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({
          category_id: yup.mixed()
            .test("required", "Xin hãy chọn danh muc", (item) => {
              if (item) return true;
              return false;
            }),
          supplier_id: yup.mixed().test("required", "Xin hãy chọn nhà cung cấp", (item) => {
            if (item) return true;
            return false;
          }),
          number_invoice: yup.string().required('Xin hãy chọn số hóa đơn'),
          date_invoice: yup.string().required('Xin hãy chọn ngày hóa đơn'),
          file: yup.string().required('Xin hãy up file'),
        }),
      ),
    ),
  };
  const handleChangeStatus = async (value) => {

    methods.trigger();
    const schema = yup.object().shape((parseInt(status) < 3 || parseInt(status) === 7) ? validationRules : validationRulesExtra);
    const formValue = methods.getValues();
    formValue.account_id = formValue.account_id.id;
    formValue.status = value
    const isValid = schema.isValidSync(formValue);
    if (isValid) {
      setLoading(true);
      try {
        const res = await fpApi.updateStatus(formValue);
        if (res.status) {
          toast.success(res.data.message);
          if (parseInt(value) === 2) {
            navigate('/admin/fps');
          }
          onChangeStatus(value);
          if(parseInt(value) ===3) methods.setValue('code_contract',res.data.data.code_contract)
          setLoading(false);
        }
      } catch (error) {
        console.log('Error', error.message);
        setLoading(false);
      }
    }

  };

  const handleChangeStatusBack = async (value) => {

      setLoading(true);
      try {
        const res = await fpApi.updateStatus(id, value);
        if (res.status) {
          toast.success(res.data.message);
          if (parseInt(value) === 2) {
            navigate('/admin/fps');
          }
          onChangeStatus(value);
          if(parseInt(value) ===3) methods.setValue('code_contract',res.data.data.code_contract)
          setLoading(false);
        }
      } catch (error) {
        console.log('Error', error.message);
        setLoading(false);
      }

  };

  return (
    <>
      {loading ? <LoadingOverlay /> : ''}
      {permissions.includes(fpPermissions.FP_APPROVED_MANAGER) && (
        <>
          {(parseInt(status) === parseInt(statusApproved.STATUS_NEW) ||
            parseInt(status) === parseInt(statusApproved.STATUS_BACK)) && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatus(1)}
                >
                  {' '}
                  Duyệt PAKD
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatusBack(7)}
                >
                  Trả về
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatusBack(2)}
                >
                  Hủy PAKD
                </Button>
              </>
            )}
          {parseInt(status) === parseInt(statusApproved.STATUS_PAKD) && (
            <>
              <Button
                color="primary"
                variant="contained"
                sx={{ mb: 2, mr: 1 }}
                size="small"
                onClick={() => handleChangeStatus(3)}
              >
                Duyệt Hợp đồng
              </Button>
              <Button
                  color="error"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatusBack(7)}
              >
                Trả về
              </Button>
            </>
          )}
        </>
      )}

      {(permissions.includes(fpPermissions.FP_APPROVED_MANAGER) ||
        permissions.includes(fpPermissions.FP_APPROVED_SALE)) && (
          <>
            {' '}
            {parseInt(status) === parseInt(statusApproved.STATUS_CONTRACT) && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatus(4)}
                >
                  Duyệt giao hàng
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    sx={{ mb: 2, mr: 1 }}
                    size="small"
                    onClick={() => handleChangeStatusBack(7)}
                >
                  Trả về
                </Button>
              </>
            )}
            {parseInt(status) === parseInt(statusApproved.STATUS_SHIPPING) && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatus(5)}
                >
                  Xuất hóa đơn
                </Button>
              </>
            )}
            {parseInt(status) === parseInt(statusApproved.STATUS_INVOICE) && (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatus(6)}
                >
                  Hoàn tất hợp đồng
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ mb: 2, mr: 1 }}
                  size="small"
                  onClick={() => handleChangeStatusBack(7)}
                >
                  Trả về
                </Button>
              </>
            )}
          </>
        )}
    </>
  );
};
