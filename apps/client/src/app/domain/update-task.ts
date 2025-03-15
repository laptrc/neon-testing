import { DateTimeUtil, UpdateTaskDto } from '@neon-testing/shared';

export type UpdateTask = {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
};

export function toUpdateTaskDto(task: UpdateTask): UpdateTaskDto {
  return {
    title: task.title,
    description: task.description,
    isCompleted: task.isCompleted,
    dueDate: DateTimeUtil.toIsoDateString(task.dueDate),
  };
}
