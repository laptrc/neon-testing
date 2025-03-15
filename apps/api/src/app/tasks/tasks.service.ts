import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TaskEntity } from '../entities';
import { CreateTask, Task, UpdateTask } from '../domain';

@Injectable()
export class TasksService {
  @InjectRepository(TaskEntity)
  private readonly tasksRepository: Repository<TaskEntity>;

  async create(createTaskDto: CreateTask): Promise<Task> {
    const task = new Task(
      null,
      createTaskDto.title,
      createTaskDto.description,
      createTaskDto.isCompleted,
      createTaskDto.dueDate,
      new Date(),
      createTaskDto.userId
    );

    const entity = await this.tasksRepository.save(task.toEntity());

    return Task.fromEntity(entity);
  }

  async findAll(): Promise<Task[]> {
    const entities = await this.tasksRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });

    return entities.map((e) => Task.fromEntity(e));
  }

  async findOne(id: number): Promise<Task> {
    const entity = await this.tasksRepository.findOneBy({ id });

    return Task.fromEntity(entity);
  }

  async update(id: number, updateTaskDto: UpdateTask): Promise<Task> {
    const entity = await this.tasksRepository.findOneBy({ id });

    const task = Task.fromEntity(entity);

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.isCompleted = updateTaskDto.isCompleted;
    task.dueDate = updateTaskDto.dueDate;

    const updatedEntity = await this.tasksRepository.save(task.toEntity());

    return Task.fromEntity(updatedEntity);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
