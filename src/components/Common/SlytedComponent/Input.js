import styled from '@emotion/styled';
import { InputBase, TextField } from '@mui/material';


export const InputBaseStyled = styled(InputBase, {})(({ theme }) => ({
    padding: 0,
    // margin: theme.spacing(0.5)
}));

export const TextFiledStyled = styled(TextField, {})(({ theme }) => ({

    marginTop: theme.spacing(1)
}));
export const TextFiledStyledSmall = styled(TextField, {})(({ theme }) => ({
    marginTop: theme.spacing(1),
    '& .MuiInputBase-input': {
        fontSize: '12px',
    },
    '& .MuiInputLabel-root': {
        fontSize: '12px',
    },
}));



