import styled from '@emotion/styled';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const DeleteIconStyled = styled(DeleteForeverIcon, {})(({ theme }) => ({
    color: theme.palette.fourth.main,
    cursor: "pointer"

}));


