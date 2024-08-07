import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class HistoryService {

    constructor(private prisma: PrismaService) {}


    /*

    const data = {

        action: 'create',
        task: 'Task Name',
        taskList: 'Task List Name',

        newTaskList?: 'Task List New Name',
        newTask?: 'Task New Name',
        priority?: 'Priority',
        dueDate?: 'Due Date'

    }

    */

    recordConverter(data) {

        let result = '';

        switch (data.action) {
            case "create list": result = `You create a task list ${data.taskList}`; break;
            case "delete list": result = `You delete a task list ${data.taskList}`; break;
            case "rename list": result = `You rename a task list ${data.taskList} to ${data.newTaskList}`; break;
            case "create task": result = `You create a task ${data.task} in ${data.taskList}`; break;
            case "delete task": result = `You delete a task ${data.task} in ${data.taskList}`; break;
            case "rename task": result = `You rename a task ${data.task} to ${data.newTask} in ${data.taskList}`; break;
            case "change description": result = `You change the description of ${data.task} in ${data.taskList}`; break;
            case "change priority": result = `You change the priority of ${data.task} to ${data.priority} in ${data.taskList}`; break;
            case "change date": result = `You change the due date of ${data.task} to ${data.dueDate} in ${data.taskList}`; break;
            case "move task": result = `You move ${data.task} from ${data.taskList} to ${data.newTaskList}`; break;
            default: result = `You do an action with ${data}`; break;
        }

        return result;

    }

    async create(data) {
        const record = this.recordConverter(data);
        await this.prisma.history.create({ data: { action: record } });
    }

    async findAll() {
        const result = await this.prisma.history.findMany({ orderBy: {time_create: 'desc'} });
        return result;
    }

    async findUnique(id: number) {
        const result = await this.prisma.history.findMany({ where: { task_id: id }, orderBy: {time_create: 'desc'} });
        return result;
    }

}
