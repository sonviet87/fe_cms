import { AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeLSItem } from 'utils';

// import { Container } from './styles';

function AdminHeader() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);



    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(authActions.logout());
        removeLSItem('access_token');
        removeLSItem('typeLogin');
        navigate('/login');
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1, mt: 1, mb: 1 }}>
                    <img src={process.env.PUBLIC_URL + "/bottom_logo.png"} alt='' width={250} />
                </Box>


                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>

                    </Menu>
                </div>

            </Toolbar>
        </AppBar>
    );
}

export default AdminHeader;