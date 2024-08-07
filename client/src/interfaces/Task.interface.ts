interface ITask {
    list_id: number
    name: string
    priority_id: number
    description: string
    due_date: string
}

export interface IGetTask extends ITask {
    task_id: number,
    time_create: string,
    time_update: string,
    priority: { priority_id: number, name: string },
    task_lists: { list_id: number, name: string, time_create: string },
    date: string
}

export interface ICreateTask extends ITask {}

export interface IUpdateTask extends Partial<ITask> {}

export interface ITasks {
    list_id: number,
	tasks: IGetTask[]
}
