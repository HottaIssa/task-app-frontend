import { Component, OnInit, signal } from '@angular/core';
import { ProjectCard } from "../../components/project-card/project-card";
import { ProjectService } from '../../services/project-service';
import { CommonModule } from '@angular/common';
import { ProjectResponse } from '../../types/U';
import { ProjectForm } from "../../components/project-form/project-form";
import { ModalLayout } from "../../components/modal-layout/modal-layout";

@Component({
  selector: 'app-home',
  imports: [ProjectCard, CommonModule, ProjectForm, ModalLayout],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit {
  projects = signal<ProjectResponse[]>([]);
  isProjectFormOpen = signal(false);
  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
      },
      error: (error) => {
        console.error('Error fetching projects', error);
      },
    });
  }
}
