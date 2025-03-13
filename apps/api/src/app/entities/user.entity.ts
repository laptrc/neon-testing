import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TaskEntity } from './task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
}
