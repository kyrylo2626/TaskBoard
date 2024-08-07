import { IHistory } from '../interfaces/History.interface'
import axios from 'axios'


class HistoryService {

    private URL = 'http://localhost:5000/api/history';

    async getHistory() { return axios.get<IHistory[]>(this.URL) }

    async getUniqueHistory(taskId: number) { return axios.get<IHistory[]>(this.URL + `/${taskId}`) }

    async createHistory(taskListName: string) { return axios.post(this.URL, { newTaskList: taskListName }) }

    async updateHistory(taskListId: number, taskListName: string) { return axios.put(this.URL + taskListId, { updTaskList: taskListName }) }

    async deleteHistory(taskListId: number) { return axios.delete(this.URL + taskListId) }

}

export default new HistoryService();