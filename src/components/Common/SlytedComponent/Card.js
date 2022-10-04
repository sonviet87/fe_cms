
import styled from '@emotion/styled';
import { Card } from '@mui/material';



export const CardWrapperStyled = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'bgColor' && prop !== 'bgColorSub'
})(({ theme, bgColor, bgColorSub }) => ({
    backgroundColor: bgColor ? bgColor : theme.palette.primary.main,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: 'none',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: bgColorSub ? bgColorSub : theme.palette.primary.light,
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: bgColorSub ? bgColorSub : theme.palette.primary.light,
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));