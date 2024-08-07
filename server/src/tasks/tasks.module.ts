import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HistoryService } from 'src/history/history.service';

@Module({
  controllers: [TasksController],
  providers: [PrismaService, HistoryService, TasksService],
})
export class TasksModule {}
