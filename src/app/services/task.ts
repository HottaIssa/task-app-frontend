import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

interface TaskResponse {
  id: string,
  title: string,
  description: string,
  status: string,
  priority: string
  dueDate: string,
}

@Injectable({
  providedIn: 'root',
})
export class Task {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

}
