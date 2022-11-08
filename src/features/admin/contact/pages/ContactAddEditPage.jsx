import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';

import accountApi from 'api/accountAPI';

import userApi from 'api/userAPI';
import ContactForm from '../components/ContactForm';
import contactApi from 'api/contactAPI';

function AdminContactAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [accounts, setAccounts] = React.useState([]);
    const [contacts, setContacts] = React.useState({});
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        phone: '',
        email: '',
        user_id: '',
        account_id: '',

    };

    React.useEffect(() => {
        (async () => {
            try {
                let [accountRs, usersRs] = await Promise.all([
                    accountApi.getAll(),
                    userApi.getAll(),
                ]);
                if (accountRs.status) {
                    setAccounts(accountRs.data.data);
                }

                if (usersRs.status) {
                    setUsers(usersRs.data.data);
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
                const res = await contactApi.get(id);

                if (res.status) {
                    setContacts({
                        name: res.data.data.name,
                        phone: res.data.data.phone ?? '',
                        email: res.data.data.email,
                        user_id: res.data.data.user_id,
                        account_id: res.data.data.account_id,

                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/contacts');
                }
            } catch (error) {
                console.log('get contact by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await contactApi.update(id, formValues);
            } else {
                res = await contactApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/contacts');
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
            <TitleForm lable={isEdit ? "Cập nhật liện hệ" : "Thêm liên hệ"} />

            {(!isEdit || Boolean(contacts)) && (
                <ContactForm initialValue={initialValue} onSubmit={handleFormSubmit} accountsValue={accounts} usersValue={users} itemValue={contacts} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminContactAddEditPage;
