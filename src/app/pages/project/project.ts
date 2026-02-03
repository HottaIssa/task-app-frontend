import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Tasks } from './tasks/tasks';
import { Column, TaskProject } from '../../types/U';
import { About } from '../../components/about/about';
import { DropdownLayout } from '../../components/dropdown-layout/dropdown-layout';
import { ProjectContextService } from '../../services/project-context-service';
import { ModalLayout } from "../../components/modal-layout/modal-layout";
import { Members } from "../../components/members/members";
import { RouterOutlet } from '@angular/router';
import { TaskService } from '../../services/task-service';


@Component({
  selector: 'app-project',
  imports: [Tasks, About, DropdownLayout, ModalLayout, Members, RouterOutlet],
  templateUrl: './project.html',
  styles: ``,
})
export class Project implements OnInit {
  isAboutOpen = signal(false);
  isMemberOpen = signal(false);
  private projectContext = inject(ProjectContextService);
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);

  project = signal<TaskProject>({
    columns: [] as Column[],
    project: {} as TaskProject['project'],
  });
  @Input('id') projectId: string = '';

  ngOnInit(): void {
    if (this.projectId) {
      this.loadData(this.projectId);

      this.taskService.updatedTask$.subscribe((task) => {
        this.loadData(this.projectId);
      })
    }
  }

  loadData(id: string) {
    this.projectService.getTasksByProject(id).subscribe((response) => {
      this.project.set(response);
      this.projectContext.setMembership({
        projectId: this.projectId,
        role: this.project().project.roleMember,
      });
    });
  }

  ngOnDestroy() {
    this.projectContext.clear();
  }
}
