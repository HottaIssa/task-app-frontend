import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  project = signal<TaskProject>({} as TaskProject);
  projectId: string | null = '';
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
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
    });
  }
}
