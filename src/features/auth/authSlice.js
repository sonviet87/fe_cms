import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/userAPI';

// First, create the thunk
export const loginThunk = createAsyncThunk('login', async (data) => {
    const response = await userApi.login({
        username: data.username,
        password: data.password,
    });
    return response;
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        settings: null,
        roles: null,
        typeLogin: null,
    },
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        setRoles(state, action) {
            state.roles = action.payload;
        },
        setTypeLogin(state, action) {
            state.typeLogin = action.payload;
        },
        logout(state) {
            state.currentUser = null;
            state.settings = null;
            state.roles = null;
            state.typeLogin = null;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            // Add user to the state array

            //state.currentUser = action.payload;
        });
    },
});
// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectToken = (state) => state.auth.token;
export const selectRoles = (state) => state.auth.roles;


// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
