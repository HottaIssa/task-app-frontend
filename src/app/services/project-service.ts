import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Member, ProjectResponse, TaskProject, Project, ProjectRequest } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  getProjects() {
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}/projects`);
  }

  getProject(projectId: string) {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`);
  }

  createProject(project: ProjectRequest) {
    return this.http.post<ProjectResponse>(`${this.apiUrl}/projects`, project);
  }

  getTasksByProject(projectId: string) {
    return this.http.get<TaskProject>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  getMembersByProject(projectId: string){
    return this.http.get<Member[]>(`${this.apiUrl}/projects/${projectId}/members`);
  }
}
