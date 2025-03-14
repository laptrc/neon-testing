import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { TaskDto } from '@neon-testing/shared';

import {
  CreateTask,
  fromTaskDto,
  Task,
  toCreateTaskDto,
  toUpdateTaskDto,
  UpdateTask,
} from '../domain';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly apiUrl = 'http://localhost:3000/api/tasks';
  private readonly http = inject(HttpClient);

  create(task: CreateTask): Observable<Task> {
    return this.http
      .post<TaskDto>(this.apiUrl, toCreateTaskDto(task))
      .pipe(map(fromTaskDto));
  }

  findAll(): Observable<Task[]> {
    return this.http
      .get<TaskDto[]>(this.apiUrl)
      .pipe(map((dtos) => dtos.map(fromTaskDto)));
  }

  findOne(id: number): Observable<Task> {
    return this.http
      .get<TaskDto>(`${this.apiUrl}/${id}`)
      .pipe(map(fromTaskDto));
  }

  update(id: number, task: UpdateTask): Observable<Task> {
    return this.http
      .put<TaskDto>(`${this.apiUrl}/${id}`, toUpdateTaskDto(task))
      .pipe(map(fromTaskDto));
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
