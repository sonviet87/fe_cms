import { createSlice } from '@reduxjs/toolkit';

const supplierSlice = createSlice({
    name: 'suppliers',
    initialState: {
        list: [],

    },
    reducers: {
        setListSupplier(state, action) {
            state.list = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const supplierActions = supplierSlice.actions;


export const selectListSupplier = (state) => state.suppliers.list;


// Reducer
const supplierReducer = supplierSlice.reducer;
export default supplierReducer;
