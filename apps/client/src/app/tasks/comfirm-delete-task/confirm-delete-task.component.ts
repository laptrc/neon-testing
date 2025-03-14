import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TaskDialogData } from '../tasks.component';
import { TasksService } from '../../services';

@Component({
  selector: 'app-confirm-delete-task',
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './confirm-delete-task.component.html',
  styleUrl: './confirm-delete-task.component.scss',
})
export class ConfirmDeleteTaskComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmDeleteTaskComponent>);
  private readonly data = inject<TaskDialogData>(MAT_DIALOG_DATA);
  private readonly tasksService = inject(TasksService);

  readonly task = this.data.task;

  isSaving = false;

  onConfirm() {
    this.isSaving = true;

    this.tasksService.remove(this.task!.id).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      complete: () => {
        this.isSaving = false;
      },
    });
  }
}
