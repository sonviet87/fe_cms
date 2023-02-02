import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'accounts',
    initialState: {
        list: [],

    },
    reducers: {
        setListAccount(state, action) {
            state.list = action.payload;
        },
        addAccount(state, action) {
            state.list = [...state.list,action.payload];
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const accountActions = accountSlice.actions;


export const selectListAccount = (state) => state.accounts.list;


// Reducer
const accountReducer = accountSlice.reducer;
export default accountReducer;
