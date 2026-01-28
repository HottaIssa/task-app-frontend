import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Tasks } from "./tasks/tasks";
import { Members } from "../../components/members/members";
import { TaskProject } from '../../types/U';
import { About } from '../../components/about/about';

@Component({
  selector: 'app-project',
  imports: [Tasks, Members, About],
  templateUrl: './project.html',
  styles: ``,
})
export class Project implements OnInit {
  project = signal<TaskProject>({
    columns: [],
    project: {
      id: '',
      name: '',
      totalTasks: 0,
      completeTasks: 0,
      roleMember: '',
    },
  });
  @Input('id') projectId: string = '';
  private projectService = inject(ProjectService);

  ngOnInit(): void {
      if (this.projectId) {
        this.loadData(this.projectId);
    };
  }

  loadData(id: string) {
    this.projectService.getTasksByProject(id).subscribe((response) => {
      this.project.set(response);
    });
  }
}
