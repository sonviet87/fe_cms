import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { FormLogin } from '../styles/StyledLogin';
import LoginForm from '../components/LoginForm';
import { Box, Grid, LinearProgress } from '@mui/material';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLSItem } from 'utils/localStorage';
import { setLSItem } from 'utils';
import {authActions, getData, loginThunk} from '../authSlice';
import {categoryActions} from "../../admin/category/categorySlice";
import {accountActions} from "../../admin/account/accountSlice";
import {supplierActions} from "../../admin/supplier/supplierSlice";
import {userActions} from "../../admin/user/userSlice";



//import userApi from 'api/userAPI';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {

        (async () => {
            const accessToken = getLSItem('access_token');
            const isLoggedIn = Boolean(accessToken);

            if (isLoggedIn) {
                navigate('/admin');
            }
        })();
    });
    const handleSubmit = async (formValues) => {
        setLoading(true);
        // const res = await userApi.login({
        //     username: formValues.username,
        //     password: formValues.password,
        // });

        dispatch(loginThunk(formValues)).then((res) => {

            if (res.payload?.status && res.payload !== undefined) {
                if (res.payload.data.status) {

                    setLSItem('access_token', res.payload.data.data.accessToken);
                    //delete res.payload.data.data.accessToken;
                    dispatch(authActions.setRoles(res.payload.data.data.scopes));
                    delete res.payload.data.data.roles;
                    delete res.payload.data.data.scopes;
                    dispatch(authActions.setCurrentUser(res.payload.data.data));
                    dispatch(getData()).then((res)=>{
                        const [ accountRs, categoriesRs, supplierRs, usersRs] = res.payload;
                        if (categoriesRs.status) dispatch(categoryActions.setListCategory(categoriesRs.data.data));
                        if (accountRs.status) dispatch(accountActions.setListAccount(accountRs.data.data));
                        if (supplierRs.status) dispatch(supplierActions.setListSupplier(supplierRs.data.data));
                        if (usersRs.status) dispatch(userActions.setListUser(usersRs.data.data));
                    })


                    navigate('/admin');
                } else {
                    toast.error(res.payload?.data.message);
                }
                setLoading(false);

            } else {
                if (res.payload !== undefined) toast.error(res.payload?.data.message);
                else toast.error(res.error.message);
                setLoading(false);
            }
        }).catch((errorMessage) => {
            console.error(errorMessage);
            setLoading(false);
        })


    };
    return (
        <Container>
            {loading && (
                <Box >
                    <LinearProgress />
                </Box>
            )}
            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item md={4}>

                    <FormLogin>
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="" width="150px" />

                        <LoginForm onSubmit={handleSubmit} />

                    </FormLogin>

                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;