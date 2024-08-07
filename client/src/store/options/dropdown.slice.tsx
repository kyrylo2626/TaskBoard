import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    statusIsOopen: false, statusValue: '',
    priorityIsOpen: false, priorityValue: '',
    calendarIsOpen: false, calendarValue: ''
};

export const dropdownSlice = createSlice({
    name: 'dropdownSlice',
    initialState,
    reducers: { 
        toggleTaskWindow: (state, action) => {
            initialState = action.payload;
            return initialState
        }
    }
})

export const { actions, reducer } = dropdownSlice;