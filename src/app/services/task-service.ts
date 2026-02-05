import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { TaskCardResponse, TaskFilters, TaskPage, TaskRequest, TaskResponse } from '../types/U';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  private updatedTask = new Subject<TaskCardResponse>();
  updatedTask$ = this.updatedTask.asObservable();

  notifyActualization(task: TaskCardResponse) {
    this.updatedTask.next(task);
  }

  private deletedTask = new Subject<string>();
  deletedTask$ = this.deletedTask.asObservable();

  notifyDelete(data: string) {
    this.deletedTask.next(data);
  }

  public getTasks(filters: TaskFilters) {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof TaskFilters];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    return this.http.get<TaskPage>(`${this.apiUrl}/tasks`, { params });
  }

  public getTask(id: string) {
    return this.http.get<TaskResponse>(`${this.apiUrl}/tasks/${id}`);
  }

  public createTask(data: TaskRequest) {
    return this.http.post<TaskCardResponse>(`${this.apiUrl}/tasks`, data);
  }

  public updateTaskTitle(id: string, data: { title: string }) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/title`, data);
  }

  public updateTaskDescription(id: string, data: { description: string }) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/description`, data);
  }

  public updateTaskMember(id: string, data: { memberId: string }) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/assignedTo`, data);
  }

  public updateTaskStatus(id: string) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/status`, {});
  }

  public updateTaskPriority(id: string, data: { priority: string }) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/priority`, data);
  }

  public updateTaskDueDate(id: string, data: { dueDate: Date | null }) {
    return this.http.patch<TaskCardResponse>(`${this.apiUrl}/tasks/${id}/dueDate`, data);
  }

  public deleteTask(id: string) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}
