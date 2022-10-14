import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import RoleForm from '../components/RoleForm';
import roleApi from 'api/roleAPI';
import permissionsApi from 'api/permissionAPI';

function RoleAddEditPage() {

    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [role, setRole] = React.useState({});
    const [permissions, setPermission] = React.useState([]);
    const navigate = useNavigate();

    const initialValue = {
        name: '',
        permissions: [],
        // ...role,
    };

    React.useEffect(() => {
        (async () => {
            const resPermissons = await permissionsApi.getAll();
            if (resPermissons.status) {
                console.log(resPermissons.data)
                if (resPermissons.status) {
                    setPermission(resPermissons.data.data);
                }

            }
        })();
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await roleApi.get(id);

                if (res.status) {
                    setRole({
                        name: res.data.data?.name,
                        permissions,
                    });

                } else {
                    toast.error(res.message);
                    navigate('/admin/users');
                }
            } catch (error) {
                console.log('get role by id error', error);
            }
            setLoading(false);
        })();
    }, [id, navigate]);

    const handleFormSubmit = async (formValues) => {
        console.log(formValues);
        setLoading(true);
        try {

            let res;
            if (isEdit) {
                res = await roleApi.update(id, formValues);
            } else {
                res = await roleApi.add(formValues);
            }
            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
                    navigate('/admin/roles');
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
            <TitleForm lable={isEdit ? "Cập nhật quyền" : "Thêm quyền "} />

            {(!isEdit || Boolean(role)) && (
                <RoleForm initialValue={initialValue} onSubmit={handleFormSubmit} values={role} permissions={permissions} isEdit={isEdit} />
            )}

        </WrapperPage>
    );
}

export default RoleAddEditPage;
