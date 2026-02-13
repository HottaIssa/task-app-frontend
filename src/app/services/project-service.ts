import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectResponse, TaskProject, Project, ProjectRequest, ProjectDashboard, ProjectUpdateRequest, ProjectSimpleResponse, ProjectHistory } from '../types/U';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  getProjects(status: string) {
    return this.http.get<ProjectSimpleResponse[]>(`${this.apiUrl}/projects`, {
      params: {
        status
      }
    });
  }

  getDashboardProjects() {
    return this.http.get<ProjectDashboard>(`${this.apiUrl}/projects/dashboard`);
  }

  getHistoryProjects() {
    return this.http.get<ProjectHistory>(`${this.apiUrl}/projects/history`);
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

  updateProject(projectId: string, project: ProjectUpdateRequest) {
    return this.http.patch<ProjectResponse>(`${this.apiUrl}/projects/${projectId}`, project);
  }
}
