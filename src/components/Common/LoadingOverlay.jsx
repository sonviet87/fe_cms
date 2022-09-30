
import { Box } from '@mui/system';
import React from 'react';
import loadingGif from '../../assets/images/loading.gif';



export function LoadingOverlay() {

    return (
        <Box alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}>
            <Box>
                <img src={loadingGif} alt="" />
            </Box>
        </Box>
    );
}
