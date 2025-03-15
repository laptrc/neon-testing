import { TaskDto } from '@neon-testing/shared';

import { TaskEntity } from '../entities';

export class Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  createdAt: Date;
  userId: number;

  constructor(
    id: number,
    title: string,
    description: string,
    isCompleted: boolean,
    dueDate: Date,
    createdAt: Date,
    userId: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  static fromEntity(entity: TaskEntity): Task {
    return new Task(
      entity.id,
      entity.title,
      entity.description,
      entity.isCompleted,
      entity.dueDate,
      entity.createdAt,
      entity.userId
    );
  }

  toEntity(): TaskEntity {
    return new TaskEntity(
      this.id,
      this.title,
      this.description,
      this.isCompleted,
      this.dueDate,
      this.createdAt,
      this.userId
    );
  }

  toDto(): TaskDto {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      isCompleted: this.isCompleted,
      dueDate: this.dueDate.toISOString().slice(0, 10),
      createdAt: this.createdAt.toISOString(),
      userId: this.userId,
    };
  }
}
