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
            light: '#4143c3',
            main: '#2F318F',
            greylight: '#EDEDFF',
            contrastText: '#fff',
        },
        secondary: {
            light: '#6449b5',
            main: '#4527a0',
        },
        third: {
            dark: '#2FF53D',
            light: '#53cf5c',
            main: '#28A831',
            contrastText: '#fff',
        },
        text: {
            primary: '#666',
            secondary: '#333',
        },
        nav: {
            width: '240px'
        }
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
    },
    colors: {
        lightMain: '#ede7f6'
    }
});

export default lightTheme;
