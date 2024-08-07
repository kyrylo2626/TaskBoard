import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { HistoryService } from 'src/history/history.service';


@Injectable()
export class TaskListsService {

  constructor(private prisma: PrismaService, private history: HistoryService) {}
  
  async findAll() {

    const taskLists = await this.prisma.task_lists.findMany({ select: { list_id: true, name: true } });
    const listsContent = await this.prisma.tasks.groupBy({ by: ['list_id'], _count: { list_id: true } });

    taskLists.forEach(itemA => {
      listsContent.forEach(itemB => { if (itemA.list_id === itemB.list_id) itemA['count'] = itemB._count.list_id })
      if (!itemA['count']) itemA['count'] = 0
    })

    return taskLists;
  }

  async create(newTaskList: { name: string }) {
    await this.prisma.task_lists.create({ data: { name: newTaskList.name } });
    let historyData = { action: 'create list', taskList: newTaskList.name };
    await this.history.create(historyData);
  }

  async update(id: number, updTaskList: { name: string }) {
    let taskListName = await this.getTaskListName(id);
    await this.prisma.task_lists.update({ where: { list_id: +id }, data: { name: updTaskList.name } });
    let historyData = { action: 'rename list', taskList: taskListName, newTaskList: updTaskList.name };
    await this.history.create(historyData);
  }

  async remove(id: number) {
    let taskListName = await this.getTaskListName(id);
    await this.prisma.task_lists.delete({ where: { list_id: +id } });
    let historyData = { action: 'delete list', taskList: taskListName };
    await this.history.create(historyData);
  }

  async getTaskListName(id: number) {
    let taskList = (await this.prisma.task_lists.findUnique({ where: { list_id: id }, select: { name: true } })).name;
    return taskList;
  }

}
