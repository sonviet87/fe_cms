import accountApi from "api/accountAPI";
import categoryAPi from "api/categoryAPI";
import supplierApi from "api/suppliertAPI";
import userApi from "api/userAPI";
import { accountActions } from "features/admin/account/accountSlice";
import { categoryActions } from "features/admin/category/categorySlice";
import { supplierActions } from "features/admin/supplier/supplierSlice";
import { userActions } from "features/admin/user/userSlice";
import { authActions, selectCurrentUser } from "features/auth/authSlice";
import jwtDecode from "jwt-decode";
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
                    //const res = await userApi.getUser();
                    let [userRs, accountRs, categoriesRs, supplierRs, usersRs] = await Promise.all([
                        userApi.getUser(),
                        accountApi.getList(),
                        categoryAPi.getList(),
                        supplierApi.getlist(),
                        userApi.getList()
                    ]);
                    if (!userRs.status) return navigate('/login');

                    if (userRs.status) {
                        dispatch(authActions.setRoles(userRs.data.data.roles));
                        dispatch(authActions.setCurrentUser(userRs.data.data.user));
                    }
                    //add data
                    if (categoriesRs.status) dispatch(categoryActions.setListCategory(categoriesRs.data.data));
                    if (accountRs.status) dispatch(accountActions.setListAccount(accountRs.data.data));
                    if (supplierRs.status) dispatch(supplierActions.setListSupplier(supplierRs.data.data));
                    if (usersRs.status) dispatch(userActions.setListUser(usersRs.data.data));

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