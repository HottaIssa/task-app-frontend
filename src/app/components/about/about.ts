import { Component, inject, input, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../types/U';
import { DatePipe } from '@angular/common';
import { DropdownLayout } from "../dropdown-layout/dropdown-layout";

@Component({
  selector: 'app-about',
  imports: [DatePipe, DropdownLayout],
  templateUrl: './about.html',
  styles: ``,
})
export class About {
  isModalOpen = signal(false);
  projectId = input.required<string>();
  role = input.required<string>();
  project = signal<Project>({} as Project);
  private projectService = inject(ProjectService);

  openModal(){
    this.isModalOpen.set(true);
    this.projectService.getProject(this.projectId()).subscribe({
      next: (data) => {
        this.project.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
