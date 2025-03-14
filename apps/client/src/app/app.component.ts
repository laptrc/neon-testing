import { Component } from '@angular/core';

import { TasksComponent } from './tasks';

@Component({
  imports: [TasksComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'client';
}
