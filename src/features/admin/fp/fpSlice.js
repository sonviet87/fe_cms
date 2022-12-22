import { createSlice } from '@reduxjs/toolkit';

const fpSlice = createSlice({
    name: 'fp',
    initialState: {
        status: 0,
        isEdit: false
    },
    reducers: {
        setStatus(state, action) {
            state.status = action.payload;
        },

        setIsEdit(state, action) {
            state.isEdit = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const fpActions = fpSlice.actions;


export const selectStatus = (state) => state.fp.status;
export const selectIsEdit = (state) => state.fp.isEdit;


// Reducer
const fpReducer = fpSlice.reducer;
export default fpReducer;
