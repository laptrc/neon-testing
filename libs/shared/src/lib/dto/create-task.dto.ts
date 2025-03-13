export type CreateTaskDto = {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  userId: number;
}
