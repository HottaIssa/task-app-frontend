import { Component, OnInit, signal } from '@angular/core';
import { ProjectCard } from "../../components/project-card/project-card";
import { Project } from '../../services/project';
import { CommonModule } from '@angular/common';

interface ProjectResponse {
  id: string,
  name: string,
  description: string,
  status: string,
  startDate: string,
  endDate: string,
  createdBy: string
}

@Component({
  selector: 'app-home',
  imports: [ProjectCard, CommonModule],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnInit{
  projects = signal<ProjectResponse[]>([]);
  constructor(private projectService: Project) {}

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
