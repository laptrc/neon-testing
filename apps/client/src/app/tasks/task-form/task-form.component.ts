import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CreateTask, UpdateTask } from '../../domain';
import { TasksService } from '../../services';
import { TaskDialogData } from '../tasks.component';

@Component({
  selector: 'app-task-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  private readonly dialogRef = inject(MatDialogRef<TaskFormComponent>);
  private readonly data = inject<TaskDialogData>(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);
  private readonly tasksService = inject(TasksService);

  readonly task = this.data.task;
  readonly formGroup = this.formBuilder.group({
    title: [this.task?.title, Validators.required],
    description: [this.task?.description],
    isCompleted: [this.task?.isCompleted],
    dueDate: [this.task?.dueDate, Validators.required],
    userId: [this.task?.userId, Validators.required],
  });

  isSaving = false;

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    const model: CreateTask | UpdateTask = { ...this.formGroup.value } as
      | CreateTask
      | UpdateTask;

    this.isSaving = true;

    const request = this.task
      ? this.tasksService.update(this.task.id, model as UpdateTask)
      : this.tasksService.create(model as CreateTask);

    request.subscribe({
      next: (task) => {
        this.dialogRef.close(task);
      },
      complete: () => {
        this.isSaving = false;
      },
    });
  }
}
