import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { Project } from '../../types/U';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [DatePipe],
  templateUrl: './about.html',
  styles: ``,
})
export class About implements OnInit {
  projectId = signal('');
  route = inject(ActivatedRoute);
  project = signal<Project>({} as Project);
  private projectService = inject(ProjectService);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId.set(params.get('id') ?? '');
      if (!this.projectId) return;
      this.loadData(this.projectId());
    });
  }

  loadData(id: string) {
    this.projectService.getProject(id).subscribe({
      next: (data) => {
        this.project.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
