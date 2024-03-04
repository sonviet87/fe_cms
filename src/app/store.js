
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from 'features/admin/account/accountSlice';
import categoryReducer from 'features/admin/category/categorySlice';
import fpReducer from 'features/admin/fp/fpSlice';
import supplierReducer from 'features/admin/supplier/supplierSlice';
import userReducer from 'features/admin/user/userSlice';
import authReducer from '../features/auth/authSlice';
import contactReducer from "../features/admin/contact/contactSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        fp: fpReducer,
        category: categoryReducer,
        accounts: accountReducer,
        suppliers: supplierReducer,
        users: userReducer,
        contacts: contactReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
});

