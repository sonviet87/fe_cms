import styled from "@emotion/styled";
import MuiDrawer from '@mui/material/Drawer';


export const DrawerStyled = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' })(
    ({ theme, open, drawerWidth }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth ? drawerWidth : '240px',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: 'none',
            marginTop: '65px',
            height: 'calc(100vh - 65px)',
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);