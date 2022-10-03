
import { Box } from '@mui/material';
import AdminFooter from 'components/Common/AdminFooter';
import AdminSlidebar from 'components/Common/AdminSlidebar';
import { Wrapper } from 'components/Common/SlytedComponent/Wrapper';
import AdminFeature from 'features/admin';
import React from 'react';
import AdminHeader from '../Common/AdminHeader';



function Adminlayout() {

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminHeader />
            <AdminSlidebar />
            <Wrapper component="main"  >
                <AdminFeature />
                <AdminFooter />
            </Wrapper>

        </Box>
    );
}

export default Adminlayout;

