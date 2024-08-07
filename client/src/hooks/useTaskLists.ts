import TaskListService from '../services/TaskLists.service'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useHistory } from './useHistory';

export const useTaskLists = () => {

    const { getHistory } = useHistory(undefined);

    const getTaskList = useQuery({
        queryKey: ['taskLists'],
        queryFn: () => TaskListService.getTaskLists(),
        select: ({ data }) => data
    })

    const createTaskList = useMutation({
        mutationFn: (taskListName: string) => TaskListService.createTaskList(taskListName),
        onSuccess: () => { getTaskList.refetch(); getHistory.refetch() }
    })

    const updateTaskList = useMutation({
        mutationFn: ({taskListId, taskListName}: {taskListId: number, taskListName: string}) => TaskListService.updateTaskList(taskListId, taskListName),
        onSuccess: () => { getTaskList.refetch(); getHistory.refetch() }
    })

    const deleteTaskList = useMutation({
        mutationFn: (taskListId: number) => TaskListService.deleteTaskList(taskListId),
        onSuccess: () => { getTaskList.refetch(); getHistory.refetch() }
    })

    return { getTaskList, createTaskList, updateTaskList, deleteTaskList }

}
