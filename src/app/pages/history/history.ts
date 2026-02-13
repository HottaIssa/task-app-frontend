import { Component, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { ProjectHistory } from '../../types/U';
import { DatePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-history',
  imports: [DatePipe, RouterLink],
  templateUrl: './history.html',
  styles: ``,
})
export class History {
  projectService = inject(ProjectService);
  projects = signal<ProjectHistory>({} as ProjectHistory);
  activeTab = signal<'completed' | 'cancelled'>('completed');

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.projectService.getHistoryProjects().subscribe((response) => {
      this.projects.set(response);
    });
  }
}
