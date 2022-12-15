import config from './config';

const getLocalStorageKey = (name) => `CMS_${name}`;

export const getLSItem = (name) => {

    return localStorage.getItem(getLocalStorageKey(name));
};

export const setLSItem = (name, value) => {
    localStorage.setItem(getLocalStorageKey(name), value);
};

export const removeLSItem = (name) => {
    return localStorage.removeItem(getLocalStorageKey(name));
};