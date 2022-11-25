import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import FPForm from '../components/FPForm';
import fpApi from 'api/fpAPI';
import accountApi from 'api/accountAPI';
import categoryAPi from 'api/categoryAPI';
import supplierApi from 'api/suppliertAPI';


function AdminFPAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [fps, setFP] = React.useState({});
    const [accounts, setAccounts] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [suppliers, setSuppliers] = React.useState([]);

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
        commission_percent: 10,
        bids_cost: 0,
        bids_cost_percent: 0,
        tax: 0,
        user_id: '',
        status: 0,
        selling: 0,
        margin: 0,
        details:
            [
                {
                    supplier_id: '',
                    category_id: '',
                    qty: 1,
                    price_buy: 0,
                    total_buy: 0,
                    price_sell: 0,
                    total_sell: 0,
                    profit: '10%'
                }


            ],


    };

    React.useEffect(() => {

        (async () => {
            try {
                let [accountRs, categoriesRs, supplierRs] = await Promise.all([
                    accountApi.getAll(),
                    categoryAPi.getAll(),
                    supplierApi.getlist(),
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

            }
            catch (err) {
                console.log(err);
            };
        })();

        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await fpApi.get(id);
                if (res.status) {
                    setFP({
                        name: res.data.data.name,
                        account_id: res.data.data.account_id ?? '',
                        contact_id: res.data.data.adcontact_iddress,
                        user_id: res.data.data.user_id,
                        status: res.data.data.status,
                        selling: res.data.data.selling,
                        margin: res.data.data.margin,

                    });

                } else {
                    toast.error(res.message);
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

    }
    return (
        <WrapperPage >
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit ? "Cập nhật FP" : "Thêm FP "} />

            {(!isEdit || Boolean(fps)) && (
                <FPForm initialValue={initialValue} onSubmit={handleFormSubmit} onCallContactAPi={handleCallAPIContact} itemValue={fps} accountValue={accounts} contactValue={contacts} categoriesValues={categories} suppliersValues={suppliers} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminFPAddEditPage;
