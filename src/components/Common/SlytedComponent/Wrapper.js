
import styled from '@emotion/styled';
import { Box } from '@mui/material';


export const Wrapper = styled(Box, {})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'rgb(227, 242, 253)',
    marginTop: '65px',
    flexGrow: 1,
    padding: '20px',
    marginRight: '20px',
    borderRadius: '8px 8px 0px 0px',
    width: '70%',
    ...(open && {
        marginLeft: '240px',
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


export const WrapperPage = styled(Box, {})(({ theme }) => ({
    background: '#fff',
    padding: theme.spacing(2.5),
    borderRadius: theme.spacing(1),

}));

export const WrapperBoxAlign = styled('div', {})(({ theme, align, isborder = true }) => ({

    display: 'flex',
    justifyContent: align ? align : 'flex-start',
    alignItems: 'center',
    ...(isborder && { borderBottom: '1px solid #e5e4e4' })

}));
