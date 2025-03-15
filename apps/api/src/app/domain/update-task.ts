import { UpdateTaskDto } from '@neon-testing/shared';

export class UpdateTask {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: Date;

  constructor(
    title: string,
    description: string,
    isCompleted: boolean,
    dueDate: Date
  ) {
    this.title = title;
    this.description = description;
    this.isCompleted = isCompleted;
    this.dueDate = dueDate;
  }

  static fromDto(dto: UpdateTaskDto): UpdateTask {
    return new UpdateTask(
      dto.title,
      dto.description,
      dto.isCompleted,
      new Date(dto.dueDate)
    );
  }
}
