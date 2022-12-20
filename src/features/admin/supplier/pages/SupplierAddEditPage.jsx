import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import SupplierForm from '../components/SupplierForm';
import supplierApi from 'api/suppliertAPI';
import userApi from 'api/userAPI';

function AdminSupplierAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [suppliers, setSupplier] = React.useState({});
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();

    const initialValue = {
        company: '',
        account: '',
        address: '',
        mst: '',
        phone: '',
        email: '',
        user_id: '',
    };

    React.useEffect(() => {
        (async () => {
            try {
                const usersRs = await userApi.getList();
                setUsers(usersRs.data.data);
            }
            catch (err) {
                console.log(err);
            };
        })();
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await supplierApi.get(id);
                if (res.status) {
                    setSupplier({
                        company: res.data.data.company,
                        account: res.data.data.account ?? '',
                        address: res.data.data.address,
                        mst: res.data.data.mst,
                        email: res.data.data.email,
                        phone: res.data.data.phone,
                        user_id: res.data.data.user_id,

                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/suppliers');
                }
            } catch (error) {
                console.log('get supplier by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await supplierApi.update(id, formValues);
            } else {
                res = await supplierApi.add(formValues);
            }
            if (res.status) {

                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/suppliers');
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
            <TitleForm lable={isEdit ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp "} />

            {(!isEdit || Boolean(suppliers)) && (
                <SupplierForm initialValue={initialValue} onSubmit={handleFormSubmit} itemValue={suppliers} usersValue={users} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminSupplierAddEditPage;
