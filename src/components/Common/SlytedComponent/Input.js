import styled from '@emotion/styled';
import { InputBase, TextField } from '@mui/material';


export const InputBaseStyled = styled(InputBase, {})(({ theme }) => ({
    padding: 0,
    // margin: theme.spacing(0.5)
}));

export const TextFiledStyled = styled(TextField, {})(({ theme }) => ({

    marginTop: theme.spacing(1)
}));


