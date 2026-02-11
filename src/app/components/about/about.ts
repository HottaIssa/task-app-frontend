import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Project, ProjectUpdateRequest } from '../../types/U';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectContextService } from '../../services/project-context-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [DatePipe, FormsModule],
  templateUrl: './about.html',
  styles: ``,
})
export class About implements OnInit {
  route = inject(ActivatedRoute);
  project = signal<Project>({} as Project);
  private projectService = inject(ProjectService);
  projectContext = inject(ProjectContextService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) return;
      this.loadData(id);
    });
  }

  loadData(id: string) {
    this.projectService.getProject(id).subscribe({
      next: (data) => {
        this.project.set(data);
        this.description.set(data.description);
        this.startDate.set(data.startDate);
        this.endDate.set(data.endDate);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }

  description = signal('');
  startDate = signal<Date | null>(null);
  endDate = signal<Date | null>(null);

  updateProject(id: string, project: ProjectUpdateRequest) {
    if (project.description != undefined && project.description == this.project()?.description)
      return;
    if (project.startDate != undefined && project.startDate == this.project()?.startDate) return;
    if (project.endDate != undefined && project.endDate == this.project()?.endDate) return;

    this.projectService.updateProject(id, project).subscribe({
      next: (data) => {
        this.loadData(id);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
