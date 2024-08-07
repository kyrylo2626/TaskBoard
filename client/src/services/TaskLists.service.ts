import { ITaskLists } from '../interfaces/TaskLists.interface'
import axios from 'axios'


class TaskListService {

    private URL = 'http://localhost:5000/api/lists';

    async getTaskLists() { return axios.get<ITaskLists[]>(this.URL) }

    async createTaskList(taskListName: string) { return axios.post(this.URL, { name: taskListName }) }

    async updateTaskList(taskListId: number, taskListName: string) { return axios.patch(this.URL + '/' + taskListId, { name: taskListName }) }

    async deleteTaskList(taskListId: number) { return axios.delete(this.URL + '/' + taskListId) }

}

export default new TaskListService();