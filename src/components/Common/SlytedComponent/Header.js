
import styled from '@emotion/styled';
import { Box, IconButton } from '@mui/material';


export const ToolBoxHeaderStyled = styled(Box, {})(({ theme }) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: theme.palette.nav.width,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

export const IconButtonToggleStyled = styled(IconButton, {})(({ theme }) => ({
    marginRight: '36px',
    background: theme.colors.lightMain,
    color: theme.palette.primary.main
}));