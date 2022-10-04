
import styled from '@emotion/styled';
import { ListItemButton, ListItemIcon } from '@mui/material';


export const ListItemIconStyled = styled(ListItemIcon, {})(({ theme }) => ({
    minWidth: '40px',
    paddingLeft: '10px'
}));

export const ListItemButtonStyled = styled(ListItemButton, {})(({ theme }) => ({
    padding: '15px 0',
    borderRadius: '8px',

    '&:hover': {
        background: theme.palette.primary.main,
        '& .MuiListItemIcon-root': {
            color: theme.palette.common.white,
        },
        '& .MuiListItemText-root': {
            color: theme.palette.common.white,
        },

    }
}));