import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'is_completed' })
  isCompleted: boolean;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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
}
