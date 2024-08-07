import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { actions as taskWindowActions } from '../store/options/taskWindow.slice';
import { actions as dataModeActions } from '../store/options/dataMode.slice';
import { actions as historyWindowActions } from '../store/options/historyWindow.slice';
import { actions as editNameModeActions } from '../store/options/editNameMode.slice';

import { IDataMode } from '../interfaces/Props.TaskList.interface';

import { RootState } from "../store/store";

export const useOptions = () => {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const dispatch = useDispatch();

    const selectTaskWindow = (state: RootState) => state.taskWindow;
    const taskWindow = useTypedSelector(selectTaskWindow);
    const toggleTaskWindow = (taskWindow: boolean) => dispatch(taskWindowActions.toggleTaskWindow(taskWindow));

    const selectDataMode = (state: RootState) => state.dataMode;
    const dataMode = useTypedSelector(selectDataMode);
    const toggleDataMode = (dataMode: IDataMode) => dispatch(dataModeActions.toggleDataMode(dataMode));

    const selectHistoryWindow = (state: RootState) => state.historyWindow;
    const historyWindow = useTypedSelector(selectHistoryWindow);
    const toggleHistoryWindow = (historyWindow: boolean) => dispatch(historyWindowActions.toggleHistoryWindow(historyWindow));

    const selectEditNameMode = (state: RootState) => state.editNameMode;
    const editNameMode = useTypedSelector(selectEditNameMode);
    const toggleEditNameMode = (editNameMode: number) => dispatch(editNameModeActions.toggleEditNameMode(editNameMode));

    return {
        taskWindow, toggleTaskWindow,
        dataMode, toggleDataMode,
        historyWindow, toggleHistoryWindow,
        editNameMode, toggleEditNameMode
    }

}
