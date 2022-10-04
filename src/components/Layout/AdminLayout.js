
import { Box } from '@mui/material';
import AdminFooter from 'components/Common/AdminFooter';
import AdminSlidebar from 'components/Common/AdminSlidebar';
import { Wrapper } from 'components/Common/SlytedComponent/Wrapper';
import AdminFeature from 'features/admin';
import React from 'react';
import AdminHeader from '../Common/AdminHeader';



function Adminlayout() {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AdminHeader open={open} onDrawer={toggleDrawer} />
            <AdminSlidebar open={open} />
            <Wrapper component="main"  >
                <Box sx={{ height: 'calc(100% - 20px)' }}>
                    <AdminFeature />
                </Box>
                <AdminFooter />
            </Wrapper>

        </Box>
    );
}

export default Adminlayout;

