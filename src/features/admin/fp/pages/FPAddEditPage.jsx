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
import contactApi from 'api/contactAPI';

function AdminFPAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [fps, setFP] = React.useState({});
    const [accounts, setAccounts] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);

    const navigate = useNavigate();

    const initialValue = {
        name: '',
        account_id: '',
        contact_id: '',
        user_id: '',
        status: 0,
        selling: 0,
        margin: 0,

    };

    React.useEffect(() => {

        (async () => {
            try {
                let [accountRs, contactRs] = await Promise.all([
                    accountApi.getAll(),
                    contactApi.getAll(),
                ]);
                if (accountRs.status) {
                    setAccounts(accountRs.data.data);
                }

                if (contactRs.status) {
                    setContacts(contactRs.data.data);
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

    return (
        <WrapperPage >
            {loading && (
                <LoadingOverlay />
            )}
            <TitleForm lable={isEdit ? "Cập nhật FP" : "Thêm FP "} />

            {(!isEdit || Boolean(fps)) && (
                <FPForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={fps} accountValue={accounts} contactValue={contacts} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminFPAddEditPage;
