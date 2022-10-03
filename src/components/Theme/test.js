import { Button } from '@mui/material';
import React, { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';
function Test(props) {
    const setThemeName = useContext(ThemeContext);
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setThemeName('lightTheme')}>
                Set Light Theme
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setThemeName('darkTheme')}>
                Set Dark Theme
            </Button>
        </div>
    );
}

export default Test;
