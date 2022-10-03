import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        type: 'light',
        common: {
            black: '#333333',
            white: '#fff',
            grey: '#666666',
            greylight: '#ECEDEF',
            darkblue: '#2F318F',
            lightblue: '#005BAA',
            orange: '#F15A38',
        },
        primary: {
            dark: '#3499E1',
            light: '#3499E1',
            main: '#2F318F',
            greylight: '#EDEDFF',
            contrastText: '#fff',
        },
        secondary: {
            main: '#3499E1',
        },
        third: {
            main: '#EB2B00',
        },
        text: {
            primary: '#666',
            secondary: '#333',
        },
    },
    typography: {
        fontFamily: `"Montserrat", "Helvetica", "Arial", sans-serif`,
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            lg1366: 1367,
            xl: 1536,
        },
    }
});

export default lightTheme;
