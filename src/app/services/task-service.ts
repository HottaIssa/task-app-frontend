import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskCardResponse, TaskFilters, TaskPage, TaskRequest, TaskResponse } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  public getTasks(filters: TaskFilters){
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

}
