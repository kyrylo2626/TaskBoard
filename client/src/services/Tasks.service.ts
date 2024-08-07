import axios from 'axios'
import { ITasks, ICreateTask, IUpdateTask } from '../interfaces/Task.interface'


class TasksService {

    private URL = 'http://localhost:5000/api/tasks';

    async getTasks() { return axios.get<ITasks[]>(this.URL) }

    async getCreateTask() { return axios.get(this.URL + '/create') }

    async createTask(newTask: ICreateTask) { return axios.post(this.URL, { newTask: newTask }) }

    async updateTask(taskId: number, updTask: IUpdateTask) { return axios.patch(this.URL + '/' + taskId, { updTask: updTask }) }

    async deleteTask(taskId: number) { axios.delete(this.URL + '/' + taskId) }

}

export default new TasksService();