import { Component, inject, signal } from '@angular/core';
import { ModalLayout } from "../modal-layout/modal-layout";
import { form, maxLength, required, FormField, submit } from '@angular/forms/signals';
import { ProjectRequest } from '../../types/U';
import { ProjectService } from '../../services/project-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [ModalLayout, FormField],
  templateUrl: './project-form.html',
  styles: ``,
})
export class ProjectForm {
  isModalOpen = signal(false);
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
    required(schemaPath.description, { message: 'Description is requiered' });
    maxLength(schemaPath.name, 50, { message: 'Name must be at most 50 characters long' });
    maxLength(schemaPath.description, 200, { message: 'Description must be at most 200 characters long' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.projectForm, async () => {
      const req = {
        ...this.projectModel(),
        startDate: this.projectModel().startDate ? new DatePipe('es-PE').transform(this.projectModel().startDate, 'yyyy-MM-dd') : null,
        endDate: this.projectModel().endDate ? new DatePipe('es-PE').transform(this.projectModel().endDate, 'yyyy-MM-dd') : null
      };

      this.projectService.createProject(req).subscribe({
        next: (response) => {
          console.log('Respuesta recibida')
          console.log(response.id);
          this.router.navigate(['/project', response.id]);
        },
        error: (error) => {
          console.error('Create project failed', error);
        },
      });
    });
  }
}
