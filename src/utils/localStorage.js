import config from './config';

const getLocalStorageKey = (name) => `${config.APP_NAME}_${name}`;

export const getLSItem = (name) => {
    console.log(getLocalStorageKey(name))
    return localStorage.getItem(getLocalStorageKey(name));
};

export const setLSItem = (name, value) => {
    localStorage.setItem(getLocalStorageKey(name), value);
};

export const removeLSItem = (name) => {
    return localStorage.removeItem(getLocalStorageKey(name));
};