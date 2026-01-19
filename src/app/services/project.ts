import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ProjectResponse {
  id: string,
  name: string,
  description: string,
  status: string,
  startDate: string,
  endDate: string,
  createdBy: string
}

@Injectable({
  providedIn: 'root',
})
export class Project {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient){}

  getProjects(){
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}/projects`);
  }

}
