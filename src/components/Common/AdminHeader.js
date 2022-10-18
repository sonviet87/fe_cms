import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLSItem } from 'utils';
import { AppBarStyled } from './SlytedComponent/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButtonToggleStyled, ToolBoxHeaderStyled } from './SlytedComponent/Header';


function AdminHeader(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectUser = useSelector(selectCurrentUser);
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

    const handleDrawer = () => {
        if (!props.onDrawer) return;
        props.onDrawer(props.open);
    }

    return (
        <AppBarStyled position="fixed">
            <Toolbar>
                <ToolBoxHeaderStyled >
                    <img src={process.env.PUBLIC_URL + "/logo.png"} alt='' height="40px" />
                    <IconButtonToggleStyled
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}

                    >
                        <MenuIcon />
                    </IconButtonToggleStyled>
                </ToolBoxHeaderStyled>
                <Box sx={{ flexGrow: 1 }}></Box>

                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color={"success"}
                    >
                        <AccountCircle />
                        <Typography component="span" color="#000" >{selectUser.name}</Typography>
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
        </AppBarStyled>
    );
}

export default AdminHeader;

