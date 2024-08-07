import { createSlice } from '@reduxjs/toolkit'

let initialState = false;

export const taskWindowSlice = createSlice({
    name: 'taskWindow',
    initialState,
    reducers: { 
        toggleTaskWindow: (state, action) => {
            initialState = action.payload;
            return initialState
        }
    }
})

export const { actions, reducer } = taskWindowSlice;