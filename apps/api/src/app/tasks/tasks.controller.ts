import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';

import { CreateTaskDto, TaskDto, UpdateTaskDto } from '@neon-testing/shared';

import { TasksService } from './tasks.service';
import { CreateTask, UpdateTask } from '../domain';

@Controller('tasks')
export class TasksController {

  @Inject(TasksService)
  private readonly tasksService: TasksService;

  @Post()
  @ApiBody({ required: true })
  async create(@Body() dto: CreateTaskDto): Promise<TaskDto> {
    const task = await this.tasksService.create(CreateTask.fromDto(dto));

    return task.toDto();
  }

  @Get()
  async findAll(): Promise<TaskDto[]> {
    const tasks = await this.tasksService.findAll();

    return tasks.map(t => t.toDto());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskDto> {
    const task = await this.tasksService.findOne(+id);

    return task.toDto();
  }

  @Put(':id')
  @ApiBody({ required: true })
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.tasksService.update(+id, UpdateTask.fromDto(dto));

    return task.toDto();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(+id);
  }
}
