import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface TaskProject {
  columns: Column[];
  project: {
    id: string;
    name: string;
    totalTasks: number;
    completeTasks: number;
  };
}

export interface Column {
  statusId: number;
  statusName: string;
  statusColor: string;
  orderIndex: number;
  taskCount: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  isOverdue: boolean;
  assignedTo: {
    id: string;
    username: string;
    email: string;
  };
}

interface ProjectResponse {
  id: string,
  name: string,
  description: string,
  status: string,
  startDate: string,
  endDate: string,
  createdBy: string
}

export interface Member {
  id: string;
  user: User;
  roleMember: string;
  joinedAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar_url: null;
}

@Injectable({
  providedIn: 'root',
})
export class Project {
  private apiUrl = 'http://localhost:8080/api';

  private http = inject(HttpClient);

  getProjects() {
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}/projects`);
  }

  getProject(projectId: string) {
    return this.http.get<ProjectResponse>(`${this.apiUrl}/projects/${projectId}`);
  }

  getTasksByProject(projectId: string) {
    return this.http.get<TaskProject>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  getMembersByProject(projectId: string){
    return this.http.get<Member[]>(`${this.apiUrl}/projects/${projectId}/members`);
  }
}
