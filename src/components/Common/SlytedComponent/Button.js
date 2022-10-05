import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';

export const BasicButtonStyled = styled(Button, {})(({ theme }) => ({
    padding: theme.spacing(1),
    minWidth: 'auto',
    margin: theme.spacing(0.5)
}));

export const IconButtonStyled = styled(IconButton, {})(({ theme }) => ({
    padding: theme.spacing(0.5),

}));