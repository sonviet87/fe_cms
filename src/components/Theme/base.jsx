import lightTheme from './LightTheme';

const themeMap = {
    lightTheme,
};

export const themeCreator = (theme) => themeMap[theme];
