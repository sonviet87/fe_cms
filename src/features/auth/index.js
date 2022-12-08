import React, { useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { getLSItem } from '../../utils';


function AuthFeature() {
    const isLoggedIn = useMemo(() => Boolean(getLSItem('access_token')), []);
    if (!isLoggedIn) {
        return <Navigate replace to="/login" />;
    }

    return <Navigate replace to="/admin" />;
}

export default AuthFeature;
