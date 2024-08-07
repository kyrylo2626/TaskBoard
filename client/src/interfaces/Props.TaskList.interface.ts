import { IGetTask, ICreateTask } from "./Task.interface";
import { ITaskLists } from "./TaskLists.interface";

export interface IPropsTaskList {
    taskList: ITaskLists,
    tasks: IGetTask[],
    setState: (a: ICreateTask) => void,
    isLast?: boolean
}

export interface IDataMode {
    mode: string,
    task?: IGetTask,
    taskList?: ITaskLists
}

export interface IPropsTask {
    task: IGetTask,
    setState: (a: ICreateTask) => void,
}

export type ManageWindowType = string | { type: string, id: number }

export interface IManageWindow {
    manageWindow: ManageWindowType,
    setManageWindow: (a: string | { type: string, id: number }) => void
}

