import { CreateTaskDto, UpdateTaskDto } from '@neon-testing/shared';

export class CreateTask {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: number;

  constructor(title: string, description: string, isCompleted: boolean, dueDate: Date, userId: number) {
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
    this.userId = userId;
  }

  static fromDto(dto: CreateTaskDto): CreateTask {
    return new CreateTask(dto.title, dto.description, dto.isCompleted, new Date(dto.dueDate), dto.userId);
  }
}
