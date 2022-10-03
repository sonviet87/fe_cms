import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { themeCreator } from './base';

export const ThemeContext = React.createContext((themeName) => ({}));

const ThemeMuTiProvider = (props) => {
    const curThemeName = localStorage.getItem('appTheme') || 'lightTheme';
    // State to hold the selected theme name
    const [themeName, _setThemeName] = useState(curThemeName);

    // Retrieve the theme object by theme name
    const theme = themeCreator(themeName);

    const setThemeName = (selected) => {
        localStorage.setItem('appTheme', selected);
        _setThemeName(selected);
    };
    return (
        <ThemeContext.Provider value={setThemeName}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeMuTiProvider;
