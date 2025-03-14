import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { TasksService } from '../services';
import { Task } from '../domain';
import { TaskFormComponent } from './task-form';
import { ConfirmDeleteTaskComponent } from './comfirm-delete-task';

export type TaskDialogData = {
  task?: Task;
};

@Component({
  selector: 'app-tasks',
  imports: [
    MatTableModule,
    DatePipe,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  private readonly tasksService = inject(TasksService);
  private readonly dialog = inject(MatDialog);

  displayedColumns: string[] = [
    'title',
    'description',
    'isCompleted',
    'dueDate',
    'createdAt',
    'userId',
    'actions',
  ];
  dataSource: Task[] = [];

  ngOnInit() {
    this.tasksService.findAll().subscribe((tasks) => {
      this.dataSource = tasks;
    });
  }

  onOpenTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      data: { task } as TaskDialogData,
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.dataSource = this.dataSource.map((t) =>
            t.id === result.id ? result : t
          );
        } else {
          this.dataSource.push(result);
        }

        this.dataSource = [...this.dataSource];
      }
    });
  }

  onOpenConfirmDeleteTask(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDeleteTaskComponent, {
      data: { task } as TaskDialogData,
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource = this.dataSource.filter((t) => t.id !== task.id);
      }
    });
  }
}
