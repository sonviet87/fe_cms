import { LoadingOverlay } from 'components/Common/LoadingOverlay';
import React from 'react';
import { toast } from 'react-toastify';
import userApi from 'api/userAPI';
import { WrapperPage } from 'components/Common/SlytedComponent/Wrapper';
import TitleForm from 'components/Common/TitleForm';
import UserChangePassForm from '../components/UserChangePassForm';

function AdminUserChangePassPage() {
    const [loading, setLoading] = React.useState(false);
    const initialValue = {
        password: '',
    };

    const handleFormSubmit = async (formValues) => {
        setLoading(true);
        try {
            let res;

            res = await userApi.changePass(formValues);

            if (res.data.status) {
                console.log(res)
                toast.success(res.data.message);

            } else {
                console.log(res)
                toast.error(res.data.message);
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
