import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Tasks } from './tasks/tasks';
import { Column, ProjectUpdateRequest, TaskProject } from '../../types/U';
import { About } from '../../components/about/about';
import { DropdownLayout } from '../../components/dropdown-layout/dropdown-layout';
import { ProjectContextService } from '../../services/project-context-service';
import { ModalLayout } from "../../components/modal-layout/modal-layout";
import { Members } from "../../components/members/members";
import { Router, RouterOutlet } from '@angular/router';
import { TaskService } from '../../services/task-service';
import { FloatingDropdown } from "../../components/floating-dropdown";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-project',
  imports: [Tasks, About, DropdownLayout, ModalLayout, Members, RouterOutlet, FloatingDropdown, FormsModule],
  templateUrl: './project.html',
  styles: ``,
})
export class Project implements OnInit {
  isAboutOpen = signal(false);
  isMemberOpen = signal(false);
  isOptionsOpen = signal(false);
  projectContext = inject(ProjectContextService);
  projectService = inject(ProjectService);
  taskService = inject(TaskService);
  router = inject(Router);

  project = signal<TaskProject>({
    columns: [] as Column[],
    project: {} as TaskProject['project'],
  });
  @Input('id') projectId: string = '';

  aboutOpen(){
    this.isAboutOpen.set(!this.isAboutOpen());
    this.isOptionsOpen.set(false);
  }

  memberOpen(){
    this.isMemberOpen.set(!this.isMemberOpen());
    this.isOptionsOpen.set(false);
  }

  ngOnInit(): void {
    if (this.projectId) {
      this.loadData(this.projectId);

      this.taskService.updatedTask$.subscribe((task) => {
        this.loadData(this.projectId);
      })

      this.taskService.deletedTask$.subscribe((data) => {
        this.loadData(this.projectId);
      })
    }
  }

  loadData(id: string) {
    this.projectService.getTasksByProject(id).subscribe((response) => {
      this.project.set(response);
      this.name.set(response.project.name)
      this.projectContext.setMembership({
        projectId: this.projectId,
        role: this.project().project.roleMember,
        status: this.project().project.status
      });
    });
  }

  ngOnDestroy() {
    this.projectContext.clear();
  }

  name = signal('');

  updateProject(projectId: string, project: ProjectUpdateRequest) {
    if(this.name() == project.name || this.name() == '') return
    this.projectService.updateProject(projectId, project).subscribe({
      next: (response) => {
        this.router.navigate(['/p']);
      },
      error: (error) => {
        console.error('Error updating project', error);
      }
    });
  }
}
