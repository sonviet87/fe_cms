import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import roleApi from 'api/roleAPI';
import accountApi from 'api/accountAPI';
import AccountForm from '../components/AccountForm';
import userApi from "../../../../api/userAPI";

function AdminAccountAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [account, setAccount] = React.useState({});
    //const [role, setRole] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        phone: '',
        address: '',
        legal_name: '',
        legal_address: '',
        industry: '',
        email: '',
        mst: '',
        deposit: '',
        debt: '',
        user_id: ''
    };

    React.useEffect(() => {
        (async () => {
            const rsUsers = await userApi.getList();
            if (rsUsers.status) {
                if (rsUsers.status) {
                    setUsers(rsUsers.data.data);
                }
            }
        })();
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await accountApi.get(id);

                if (res.status) {
                    setAccount({
                        name: res.data.data.name?? '',
                        phone: res.data.data.phone ?? '',
                        address: res.data.data.address?? '',
                        legal_name: res.data.data.legal_name?? '',
                        legal_address: res.data.data.legal_address?? '',
                        industry: res.data.data.industry?? '',
                        email: res.data.data.email?? '',
                        city: res.data.data.city?? '',
                        mst: res.data.data.mst?? '',
                        deposit: res.data.data.deposit ?? '',
                        debt: res.data.data.debt?? '',
                        user_id: res.data.data.user_id?? '',
                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/accounts');
                }
            } catch (error) {
                console.log('get account by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);

    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await accountApi.update(id, formValues);
            } else {
                res = await accountApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/accounts');
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
            <TitleForm lable={isEdit ? "Cập nhật khách hàng" : "Thêm khách hàng"} />

            {(!isEdit || Boolean(account)) && (
                <AccountForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={account} usersValue={users} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminAccountAddEditPage;
