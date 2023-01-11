import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import userApi from 'api/userAPI';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import UserChangePassForm from '../components/UserChangePassForm';

function AdminUserChangePassPage() {
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const initialValue = {
        oldPass: '',
        newPassFirst: '',
        newPassSecond: '',
    };

    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;

            res = await userApi.update(id, formValues);

            if (res.status) {
                console.log('res.message', res.message);
                if (res.data.status) {
                    toast.success(res.message);
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
            <TitleForm lable={"Thay đổi mật khẩu"} />

            <UserChangePassForm initialValue={initialValue} onSubmit={handleFormSubmit} />


        </WrapperPage>
    );
}

export default AdminUserChangePassPage;
