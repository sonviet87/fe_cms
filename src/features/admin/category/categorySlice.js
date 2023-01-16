import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        list: [],

    },
    reducers: {
        setListCategory(state, action) {
            state.list = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const categoryActions = categorySlice.actions;

export const selectListCategory = (state) => state.category.list;

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
