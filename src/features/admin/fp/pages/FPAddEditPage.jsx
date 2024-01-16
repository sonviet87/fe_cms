import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import FPForm from '../components/FPForm';
import fpApi from 'api/fpAPI';
import accountApi from 'api/accountAPI';
// import categoryAPi from 'api/categoryAPI';
// import supplierApi from 'api/suppliertAPI';
// import contactApi from 'api/contactAPI';
import FPHeaderPage from '../components/FPHeaderPage';
//import userApi from 'api/userAPI';
import SkeletonPageFP from 'components/Common/Skeleton/SkeletonPageFP';
import { selectRoles } from 'features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fpPermissions } from '../constants/FPConstants';
import { fpActions, selectStatus } from '../fpSlice';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
function AdminFPAddEditPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [fps, setFP] = React.useState({});
  // const [accounts, setAccounts] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  // const [categories, setCategories] = React.useState([]);
  // const [suppliers, setSuppliers] = React.useState([]);
  // const [users, setUsers] = React.useState([]);
  const status = useSelector(selectStatus);
  const [disabled, setDisable] = React.useState(false);
  const permissions = useSelector(selectRoles)

  const navigate = useNavigate();
  const validationRules = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    account_id:  yup.mixed()
        .test("required", "Xin hãy chọn tài khoản", (item) => {
          if (item) return true;
          return false;
        }),
    user_assign: yup.string().required('Xin hãy chọn danh mục'),
    details: yup.lazy(() =>
      yup.array().of(
        yup.object({
          // category_id: yup.lazy(value => {
          //   switch (typeof value) {
          //     case 'object':
          //       return yup.object().shape({
          //         name: yup.string().required("Is required"),
          //         id: yup.string().required("Is required")
          //       }); // schema for object
          //     case 'string':
          //       return yup.string().required('Xin hãy chọn danh muc'); // schema for string
          //     default:
          //       return yup.mixed().required('Xin hãy chọn danh muc'); // here you can decide what is the default
          //   }
          // }),
          category_id: yup.mixed()
            .test("required", "Xin hãy chọn danh muc", (item) => {
              if (item) return true;
              return false;
            }),
          supplier_id: yup.string().required('Xin hãy chọn nhà cung cấp'),
        }),
      ),
    ),
  };

  const validationRulesExtra = {
    name: yup.string().required('Xin hãy điền tên FP'),
    contact_id: yup.string().required('Xin hãy chọn liên hệ'),
    //account_id: yup.string().required('Xin hãy chọn tài khoản'),
    account_id:  yup.mixed()
        .test("required", "Xin hãy chọn tài khoản", (item) => {
          if (item) return true;
          return false;
        }),

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
          supplier_id: yup.string().required('Xin hãy chọn nhà cung cấp'),
          number_invoice: yup.string().required('Xin hãy chọn số hóa đơn'),
          date_invoice: yup.string().required('Xin hãy chọn ngày hóa đơn'),
          file: yup.string().required('Xin hãy up file'),
        }),
      ),
    ),
  };
  const schema = yup.object().shape((parseInt(status) < 3 || parseInt(status) === 7) ? validationRules : validationRulesExtra);
  const initialValue = {
    name: '',
    account_id: '',
    contact_id: '',
    shipping_charges: 0,
    shipping_charges_percent: 0,
    guest_costs: 0,
    guest_costs_percent: 0,
    deployment_costs: 0,
    deployment_costs_percent: 0,
    interest: 0,
    interest_percent: 0,
    commission: 0,
    commission_percent: 0,
    bids_cost: 0,
    bids_cost_percent: 0,
    tax: 0,
    user_assign: '',
    status: 0,
    selling: 0,
    margin: 0,
    date_invoice: '',
    date_shipping: '',
    number_invoice: '',
    notes: '',
    code_contract: '',
    details: [
      {
        supplier_id: '',
        category_id: '',
        qty: 1,
        price_buy: 0,
        total_buy: 0,
        price_sell: 0,
        total_sell: 0,
        profit: '10%',
        number_invoice: '',
        date_invoice: ''

      },
    ],
  };
  const methods = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });
  React.useEffect(() => {
    dispatch(fpActions.setIsEdit(isEdit));
    dispatch(fpActions.setStatus(0));
    // (async () => {
    //   try {
    //     let [accountRs, categoriesRs, supplierRs, userRs] = await Promise.all([
    //       accountApi.getList(),
    //       categoryAPi.getList(),
    //       supplierApi.getlist(),
    //       userApi.getList()
    //     ]);

    //     if (accountRs.status) {
    //       setAccounts(accountRs.data.data);
    //     }
    //     if (categoriesRs.status) {
    //       setCategories(categoriesRs.data.data);
    //     }
    //     if (supplierRs.status) {
    //       setSuppliers(supplierRs.data.data);
    //     }
    //     if (userRs.status) {
    //       setUsers(userRs.data.data);
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // })();

    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        //let [fpRs, contactRs] = await Promise.all([fpApi.get(id), contactApi.getAll()]);
        const fpRs = await fpApi.get(id);
        if (fpRs.status) {
          setFP(fpRs.data.data);
          if (permissions.includes(fpPermissions.FP_IS_SALE) && (parseInt(fpRs.data.data.status) !== 0 && (parseInt(fpRs.data.data.status) !== 7))) { setDisable(true) }
          //console.log("role", (parseInt(fpRs.data.data.status) !== 7))
          dispatch(fpActions.setStatus(fpRs.data.data.status))
          let contactRs = await accountApi.getContactByIDAccount(fpRs.data.data.account_id.id);
          if (contactRs.status) {
            setContacts(contactRs.data.data);
          }
        } else {
          toast.error(fpRs.message);
          navigate('/admin/fps');
        }
      } catch (error) {
        console.log('get fp by id error', error);
      }
      setLoading(false);
    })();
  }, [id, navigate]);

  const handleFormSubmit = async (formValues) => {
    setLoading(true);
    try {
      let res;
      if (isEdit) {
        delete formValues.account;
        delete formValues.contact;
        delete formValues.user;
        delete formValues.phone;
        delete formValues.user_assign_name;

        res = await fpApi.update(id, formValues);
      } else {

        res = await fpApi.add(formValues);
      }
      if (res.status) {
        if (res.data.status) {
          toast.success(res.message);
          navigate('/admin/fps');
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log('Error', error.message);
    }
    setLoading(false);
  };


  const handleCallAPIContact = async (formValues) => {
    const contactRs = await accountApi.getContactByIDAccount(formValues);
    if (contactRs.status) {
      setContacts(contactRs.data.data);
    }
  };

  return (
    <WrapperPage>
      <FormProvider {...methods}>
        <FPHeaderPage isEdit={isEdit} id={id} fps={fps} initialValue={initialValue} onSubmit={handleFormSubmit} />

        {loading ? (
          <SkeletonPageFP />
        ) : (
          <FPForm
            initialValue={initialValue}
            onSubmit={handleFormSubmit}
            onCallContactAPi={handleCallAPIContact}
            itemValue={fps}
            contactValue={contacts}
            isEdit={isEdit}
            disabled={disabled}
            methods={methods}
          />
        )}
      </FormProvider>
    </WrapperPage>
  );
}

export default AdminFPAddEditPage;
