import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';

import FPForm from '../components/FPForm';
import fpApi from 'api/fpAPI';
import accountApi from 'api/accountAPI';
import categoryAPi from 'api/categoryAPI';
import supplierApi from 'api/suppliertAPI';
import contactApi from 'api/contactAPI';
import FPHeaderPage from '../components/FPHeaderPage';
import userApi from 'api/userAPI';

function AdminFPAddEditPage() {
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [fps, setFP] = React.useState({});
  const [accounts, setAccounts] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const navigate = useNavigate();

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
      },
    ],
  };

  React.useEffect(() => {
    (async () => {
      try {
        let [accountRs, categoriesRs, supplierRs, userRs] = await Promise.all([
          accountApi.getAll(),
          categoryAPi.getAll(),
          supplierApi.getlist(),
          userApi.getAll()
        ]);

        if (accountRs.status) {
          setAccounts(accountRs.data.data);
        }
        if (categoriesRs.status) {
          setCategories(categoriesRs.data.data);
        }
        if (supplierRs.status) {
          setSuppliers(supplierRs.data.data);
        }
        if (userRs.status) {
          setUsers(userRs.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();

    if (!id) return;
    (async () => {
      setLoading(true);
      try {
        let [fpRs, contactRs] = await Promise.all([fpApi.get(id), contactApi.getAll()]);

        if (contactRs.status) {
          setContacts(contactRs.data.data);
        }

        if (fpRs.status) {
          setFP(fpRs.data.data);
          console.log(fpRs.data.data)
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
      {loading && <LoadingOverlay />}
      <FPHeaderPage isEdit={isEdit} id={id} fps={fps} initialValue={initialValue} onSubmit={handleFormSubmit} />
      {(!isEdit || Boolean(fps)) && (
        <FPForm
          initialValue={initialValue}
          onSubmit={handleFormSubmit}
          onCallContactAPi={handleCallAPIContact}
          itemValue={fps}
          accountValue={accounts}
          contactValue={contacts}
          categoriesValues={categories}
          suppliersValues={suppliers}
          usersValues={users}
          isEdit={isEdit}
        />
      )}
    </WrapperPage>
  );
}

export default AdminFPAddEditPage;
