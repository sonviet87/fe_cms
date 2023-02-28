import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],

    },
    reducers: {
        setListUser(state, action) {
            state.list = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const userActions = userSlice.actions;


export const selectListUser = (state) => state.users.list;


// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
