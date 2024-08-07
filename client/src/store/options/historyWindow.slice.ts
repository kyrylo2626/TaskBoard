import { createSlice } from '@reduxjs/toolkit'

let initialState = false;

export const historyWindowSlice = createSlice({
    name: 'historyWindow',
    initialState,
    reducers: { 
        toggleHistoryWindow: (state, action) => {
            initialState = action.payload;
            return initialState
        }
    }
})

export const { actions, reducer } = historyWindowSlice;