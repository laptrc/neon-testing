import { CreateTaskDto, DateTimeUtil } from '@neon-testing/shared';

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
    dueDate: DateTimeUtil.toIsoDateString(task.dueDate),
    userId: task.userId,
  };
}
