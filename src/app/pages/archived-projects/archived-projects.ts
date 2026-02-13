import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { ProjectSimpleResponse } from '../../types/U';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-archived-projects',
  imports: [DatePipe, RouterLink],
  templateUrl: './archived-projects.html',
  styles: ``,
})
export class ArchivedProjects {
  projectService = inject(ProjectService);
  archivedProjects = signal<ProjectSimpleResponse[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.projectService.getProjects('ARCHIVED').subscribe({
      next: (data) => this.archivedProjects.set(data),
      error: (error) => console.error('Error fetching projects', error),
    });
  }

}
