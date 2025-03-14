import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideHttpClient } from '@angular/common/http';

import { ConfirmDeleteTaskComponent } from './confirm-delete-task.component';

describe('ConfirmDeleteTaskComponent', () => {
  let component: ConfirmDeleteTaskComponent;
  let fixture: ComponentFixture<ConfirmDeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmDeleteTaskComponent,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        provideHttpClient(),
        {
          provide: MatDialogRef<ConfirmDeleteTaskComponent>,
          useValue: null,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { task: {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
