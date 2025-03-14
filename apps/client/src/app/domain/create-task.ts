import { CreateTaskDto } from '@neon-testing/shared';

export type CreateTask = {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  userId: number;
};

export function toCreateTaskDto(task: CreateTask): CreateTaskDto {
  return {
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    dueDate: task.dueDate.toISOString().slice(0, 10),
    userId: task.userId,
  };
}
