import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() { return this.tasksService.findAll() }

  @Get('create')
  getPriority() { return this.tasksService.getPriority() }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.tasksService.findOne(+id) }

  @Post()
  create(@Body() data: { newTask: CreateTaskDto }) { return this.tasksService.create(data.newTask) }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: { updTask: UpdateTaskDto }) {
    return this.tasksService.update(+id, data.updTask);
  }

  @Delete(':id')
  remove(@Param('id') id: string) { return this.tasksService.remove(+id) }

  
}
