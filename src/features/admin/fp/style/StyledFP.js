import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
export const WrapperBox = styled(Box, {}
)(() => ({
    marginTop: '8px',
    border: '1px solid #eee',
    borderRadius: '10px',
    padding: '10px'
}));

export const WrapperBoxItem = styled(Box, {}
)(() => ({
    padding: '5px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center'
}));

export const BoxItem = styled(Box, {}
)(() => ({
    margin: '0 5px',

}));