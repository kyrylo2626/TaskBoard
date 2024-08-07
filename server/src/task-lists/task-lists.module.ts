import { Module } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { TaskListsController } from './task-lists.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [TaskListsController],
  providers: [PrismaService, HistoryService, TaskListsService],
})
export class TaskListsModule {}
