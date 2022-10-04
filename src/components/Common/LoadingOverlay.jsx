
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';




export function LoadingOverlay() {

    return (
        <Box sx={{ display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '0', left: '0' }}>
            <CircularProgress size={100} />
        </Box>
    );
}
