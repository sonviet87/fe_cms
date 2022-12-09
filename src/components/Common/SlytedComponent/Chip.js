import styled from '@emotion/styled';
import { Chip } from '@mui/material';

export const ChipStyled = styled(Chip, {

})(({ theme, bgcolor }) => ({
    ...(bgcolor && { background: bgcolor !== '' ? bgcolor : '#e5e4e4' })

}));