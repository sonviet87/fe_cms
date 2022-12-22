
import { configureStore } from '@reduxjs/toolkit';
import fpReducer from 'features/admin/fp/fpSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        fp: fpReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
});

