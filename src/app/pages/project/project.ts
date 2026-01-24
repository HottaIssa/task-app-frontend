import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project as ProjectService } from '../../services/project';
import { Tasks } from "./tasks/tasks";

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

@Component({
  selector: 'app-project',
  imports: [RouterLink, Tasks],
  templateUrl: './project.html',
  styles: ``,
})
export class Project implements OnInit {
  project = signal<TaskProject>({} as TaskProject);
  projectId: string | null = '';
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    console.log(this.route)
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('id');
      if (this.projectId) {
        this.loadData(this.projectId);
      }
    });
  }

  loadData(id: string) {
    this.projectService.getTasksByProject(id).subscribe((response) => {
      this.project.set(response);
      console.log(this.project());
    });
  }
}
