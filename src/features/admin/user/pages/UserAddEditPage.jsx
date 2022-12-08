import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import userApi from 'api/userAPI';
import UserForm from '../components/UserForm';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import roleApi from 'api/roleAPI';

function AdminUserAddEditPage() {
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [user, setUser] = React.useState({});
    const [role, setRole] = React.useState([]);
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        role_id: '',
        ...user,
    };

    React.useEffect(() => {
        (async () => {
            const rsRole = await roleApi.getAll();
            if (rsRole.status) {
                if (rsRole.status) {
                    setRole(rsRole.data.data);
                }
            }
        })();
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await userApi.get(id);
                // const [res, resRole] = await Promise.all([
                //     await userApi.get(id),
                //     await roleApi.getAll()
                // ]);
                console.log(res)
                if (res.status) {
                    setUser({
                        name: res.data.data.name,
                        username: res.data.data.username ?? '',
                        password: '',
                        email: res.data.data.email,
                        phone: res.data.data.phone,
                        role_id: res.data.data.role_id,
                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/users');
                }
            } catch (error) {
                console.log('get user by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);


    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await userApi.update(id, formValues);
            } else {
                res = await userApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/users');
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
            <TitleForm lable={isEdit ? "Cập nhật người dùng" : "Thêm người dùng "} />

            {(!isEdit || Boolean(user)) && (
                <UserForm initialValue={initialValue} onSubmit={handleFormSubmit} userValue={user} role={role} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default AdminUserAddEditPage;
