import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService, private history: HistoryService) {}

  async findAll() {
    const taskLists = await this.prisma.task_lists.findMany({ select: { list_id: true } });
    const tasks = await this.prisma.tasks.findMany({ include: { priority: true, task_lists: true } });

    tasks.forEach(task => { let date = task.due_date.toDateString().split(' ');
                            task['date'] = `${date[0]}, ${date[2]} ${date[1]}` })
    let result = [];

    taskLists.map(taskList => { let taskListObj = {};
                                taskListObj['list_id'] = taskList.list_id;
                                taskListObj['tasks'] = [];
                                tasks.map(task => { if (task.list_id === taskList.list_id) taskListObj['tasks'].push(task) })
                                result.push(taskListObj) })

    return result;
  }

  async findOne(id: number) {
    const result = await this.prisma.tasks.findUnique({where: {task_id: +id}});
    return result;
  }

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.prisma.tasks.create({
      data: { ...createTaskDto, list_id: +createTaskDto.list_id, priority_id: +createTaskDto.priority_id } } );

    let historyData = { action: 'create task', task: createTaskDto.name, taskList: this.getTaskListName({ list_id: +createTaskDto.list_id }) };
    await this.history.create(historyData);

    return result;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const records = await this.updateHistoryRecord(id, updateTaskDto);

    let newData = {}; newData = { ...updateTaskDto };
    if (updateTaskDto.hasOwnProperty('list_id')) newData['list_id'] = +updateTaskDto.list_id;
    if (updateTaskDto.hasOwnProperty('priority_id')) newData['priority_id'] = +updateTaskDto.priority_id;

    const result = await this.prisma.tasks.update({ where: { task_id: +id }, data: newData });

    records.forEach(async record => await this.history.create(record));

    return result;
  }

  async remove(id: number) {
    const data = { task: await this.getTaskName(id), taskList: await this.getTaskListName({ task_id: id }) };
    const result = await this.prisma.tasks.delete({ where: { task_id: +id } });

    let historyData = { action: 'delete task', ...data };
    await this.history.create(historyData);
    
    return result;
  }

  async updateHistoryRecord(id: number, updateTaskDto: UpdateTaskDto) {
    let records = [];
    const data = { task: this.getTaskName(id), taskList: this.getTaskListName({ task_id: id }) };

    if (updateTaskDto.hasOwnProperty('name')) {
      records.push({ ...data, action: 'rename task', newTask: updateTaskDto.name }) }

    if (updateTaskDto.hasOwnProperty('description')) {
      records.push({ ...data, action: 'change description' }) }

    if (updateTaskDto.hasOwnProperty('priority_id')) {
      const newPriority = this.prisma.priority.findUnique({ where: { priority_id: +updateTaskDto.priority_id } })
      records.push({ ...data, action: 'change priority', priority: newPriority }) }

    if (updateTaskDto.hasOwnProperty('due_date')) {
      records.push({ ...data, action: 'change date', dueDate: updateTaskDto.due_date }) }

    if (updateTaskDto.hasOwnProperty('list_id')) {
      records.push({ ...data, action: 'move task', newTaskList: this.getTaskListName({ list_id: +updateTaskDto.list_id }) }) }

    return records;
  }

  async getTaskName(id: number) {
    const task = (await this.prisma.tasks.findUnique({ where: { task_id: id }, select: { name: true } })).name;
    return task;
  }

  async getTaskListName(data: {task_id?: number, list_id?: number}) {
    let taskList: string;

    if (data.list_id) {
      taskList = (await this.prisma.task_lists.findUnique({
                        where: { list_id: data.list_id }, select: { name: true } })).name;
    } else if (data.task_id) {
      taskList = (await this.prisma.tasks.findUnique({
                        where: { task_id: data.task_id }, select: { task_lists: { select: { name: true } } }
                        })).task_lists.name }

    return taskList;
  }

  async getPriority() {
    const priorities = await this.prisma.priority.findMany();
    return priorities;
  }

}
