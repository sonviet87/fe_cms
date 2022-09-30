import { APP_NAME } from "../config";


export const getLSItem = (name) => {
    return localStorage.getItem(APP_NAME + '_' + name);
};

export const setLSItem = (name, value) => {
    localStorage.setItem(APP_NAME + '_' + name, value);
};

export const removeLSItem = (name) => {
    return localStorage.removeItem(APP_NAME + '_' + name);
};
