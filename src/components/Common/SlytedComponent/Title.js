import styled from '@emotion/styled';
import { Box } from '@mui/material';



export const TitleFormStyled = styled(Box, {})(({ theme, isborder = true }) => ({
    fontWeight: '600',
    fontSize: '18px',
    paddingBottom: theme.spacing(1.3),
    marginBottom: theme.spacing(2.5),

    ...(isborder && { borderBottom: '1px solid #e5e4e4' })

}));