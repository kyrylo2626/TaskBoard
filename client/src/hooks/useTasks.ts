import TasksService from '../services/Tasks.service'
import { useMutation, useQuery } from '@tanstack/react-query';
import { ICreateTask, IUpdateTask } from '../interfaces/Task.interface'
import { useHistory } from './useHistory';
import { useTaskLists } from './useTaskLists';

export const useTasks = () => {

    const { getHistory } = useHistory(undefined);
    const { getTaskList } = useTaskLists();

    const getTasks = useQuery({
        queryKey: ['tasks'],
        queryFn: () => TasksService.getTasks(),
        select: ({ data }) => data
    })

    const getCreateTask = useQuery({
        queryKey: ['createTask'],
        queryFn: () => TasksService.getCreateTask(),
        select: ({ data }) => { return { priorities: data, status: getTaskList.data } }
    })

    const createTask = useMutation({
        mutationFn: (newTask: ICreateTask) => TasksService.createTask(newTask),
        onSuccess: () => { getTasks.refetch(); getHistory.refetch() }
    })

    const updateTask = useMutation({
        mutationFn: ({taskId, updTask}: {taskId: number, updTask: IUpdateTask}) => TasksService.updateTask(taskId, updTask),
        onSuccess: () => { getTasks.refetch(); getHistory.refetch() }
    })

    const deleteTask = useMutation({
        mutationFn: (taskId: number) => TasksService.deleteTask(taskId),
        onSuccess: () => { getTasks.refetch(); getHistory.refetch() }
    })

    return { getTasks, createTask, updateTask, deleteTask, getCreateTask }

}
