import { createSlice } from '@reduxjs/toolkit';

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        list: [],

    },
    reducers: {
        setListContact(state, action) {
            state.list = action.payload;
        },
        addContact(state, action) {
            state.list = [...state.list,action.payload];
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed 
    },
});
// Actions
export const contactActions = contactSlice.actions;


export const selectListContact = (state) => state.contacts.list;


// Reducer
const contactReducer = contactSlice.reducer;
export default contactReducer;
