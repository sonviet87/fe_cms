import { createSlice } from '@reduxjs/toolkit';


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
