import { Component, inject, signal } from '@angular/core';
import { form, maxLength, required, FormField, submit } from '@angular/forms/signals';
import { ProjectRequest } from '../../types/U';
import { ProjectService } from '../../services/project-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [FormField],
  templateUrl: './project-form.html',
  styles: ``,
})
export class ProjectForm {
  isProjectFormOpen = signal(false);
  private projectService = inject(ProjectService);
  private router = inject(Router);

  projectModel = signal<ProjectRequest>({
    name: '',
    description: '',
    startDate: null,
    endDate: null,
  });

  projectForm = form(this.projectModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is requiered' });
    maxLength(schemaPath.name, 50, { message: 'Name must be at most 50 characters long' });
    maxLength(schemaPath.description, 200, {
      message: 'Description must be at most 200 characters long',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.projectForm, async () => {

      this.projectService.createProject(this.projectModel()).subscribe({
        next: (response) => {
          this.router.navigate(['/p', response.id]);
        },
        error: (error) => {
          console.error('Create project failed', error);
        },
      });
    });
  }
}
