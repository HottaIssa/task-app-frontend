import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalLayout } from '../modal-layout/modal-layout';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { TaskResponse } from '../../types/U';
import { DatePipe } from '@angular/common';
import { ProjectContextService } from '../../services/project-context-service';
import { AuthService } from '../../services/auth-service';
import { CommentChat } from "../comment-chat/comment-chat";

@Component({
  selector: 'app-task-info',
  imports: [ModalLayout, DatePipe, CommentChat],
  templateUrl: './task-info.html',
  styles: ``,
})
export class TaskInfo implements OnInit {
  isTaskInfoOpen = signal(false);
  route = inject(ActivatedRoute);
  router = inject(Router);
  taskId = signal('');
  taskService = inject(TaskService);
  task = signal<TaskResponse | null>(null);
  authProject = inject(ProjectContextService);
  auth = inject(AuthService);

  taskInfoClosed() {
    this.isTaskInfoOpen.set(false);
    this.router.navigate(['../..'], {
      relativeTo: this.route,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;

      this.taskId.set(id);
      this.loadData(id);
    });
  }

  setStatusName(name: string) {
    if (name == 'TODO') return 'Backlog';
    if (name == 'IN_PROGRESS') return 'In Progress';
    if (name == 'IN_REVIEW') return 'In Review';
    if (name == 'DONE') return 'Done';

    return '';
  }

  readonly colorMap: Record<string, string> = {
    High: 'bg-[#FEE2E2] text-[#EF4444]',
    Medium: 'bg-[#FEF9C3] text-[#EAB308]',
    Low: 'bg-[#DCFCE7] text-[#22C55E]',
  };

  loadData(id: string) {
    this.taskService.getTask(id).subscribe({
      next: (data) => {
        this.task.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }


}
