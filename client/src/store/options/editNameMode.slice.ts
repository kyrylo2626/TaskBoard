import { createSlice } from '@reduxjs/toolkit'

let initialState = 0;

export const editNameModeSlice = createSlice({
    name: 'editNameMode',
    initialState,
    reducers: { 
        toggleEditNameMode: (state, action) => {
            initialState = action.payload;
            return initialState
        }
    }
})

export const { actions, reducer } = editNameModeSlice;