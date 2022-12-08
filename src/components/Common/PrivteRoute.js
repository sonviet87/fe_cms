import userApi from "api/userAPI";
import { authActions, selectCurrentUser } from "features/auth/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLSItem, removeLSItem } from "utils";
import { LoadingOverlay } from "./LoadingOverlay";


function PrivateRoute({ children }) {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectUser = useSelector(selectCurrentUser);

    useEffect(() => {
        (async () => {
            const accessToken = getLSItem('access_token');
            const isLoggedIn = Boolean(accessToken);

            if (!isLoggedIn) {
                return navigate('/login');
            }
            if (!selectUser) {
                try {
                    const res = await userApi.getUser();
                    if (!res.status) return navigate('/login');
                    console.log(res)
                    dispatch(authActions.setRoles(res.data.data.roles));
                    dispatch(authActions.setCurrentUser(res.data.data.user));
                } catch (err) {
                    toast.error("Lỗi đăng nhập")
                    //console.log(err.response.data);
                    dispatch(authActions.logout());
                    removeLSItem('access_token');
                    removeLSItem('typeLogin');
                    return navigate('/login');
                }


            }
            setLoading(false);
        })();
    }, [navigate, selectUser, dispatch]);

    if (loading) {
        return <LoadingOverlay />;
    }

    return children;
}
export default PrivateRoute;