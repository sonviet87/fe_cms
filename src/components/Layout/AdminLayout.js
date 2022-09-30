import { Box } from '@mui/material';
import AdminFooter from 'components/Common/AdminFooter';
import AdminFeature from 'features/admin';
import React from 'react';
import AdminHeader from '../Common/AdminHeader';



function Adminlayout() {

    return (
        <Box >
            <AdminHeader />
            <AdminFeature />
            <AdminFooter />
        </Box>
    );
}

export default Adminlayout;