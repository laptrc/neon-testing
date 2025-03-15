import { TaskDto } from '@neon-testing/shared';

export type Task = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;
  createdAt: Date;
  userId: number;
};

export function fromTaskDto(dto: TaskDto): Task {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    isCompleted: dto.isCompleted,
    dueDate: new Date(dto.dueDate),
    createdAt: new Date(dto.createdAt),
    userId: dto.userId,
  };
}
