import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IDataMode } from '../../interfaces/Props.TaskList.interface';


let initialState = {} as IDataMode;

export const dataModeSlice = createSlice({
    name: 'dataMode',
    initialState,
    reducers: { 
        toggleDataMode: (state, action: PayloadAction<IDataMode>) => {
            if (action.payload.mode === 'read') initialState = { mode: action.payload.mode, task: action.payload.task };
            else if (action.payload.mode === 'create') initialState = { mode: action.payload.mode, taskList: action.payload.taskList };
            return initialState
        }
    }
})

export const { actions, reducer } = dataModeSlice;