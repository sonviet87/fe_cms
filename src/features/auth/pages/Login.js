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
import { authActions } from '../authSlice';
import userApi from 'api/userAPI';


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
        const res = await userApi.login({
            username: formValues.username,
            password: formValues.password,
        });
        if (res.status) {

            if (res.data.status) {
                setLSItem('access_token', res.data.data.accessToken);
                delete res.data.data.accessToken;
                dispatch(authActions.setRoles(res.data.data.roles));
                delete res.data.roles;
                dispatch(authActions.setCurrentUser(res.data.data));
                navigate('/admin');
            } else {
                toast.error(res.data.message);
            }
            setLoading(false);

        } else {
            toast.error(res.message);
        }


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