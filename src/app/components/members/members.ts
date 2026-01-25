import { Component, inject, input, signal } from '@angular/core';
import { ModalLayout } from '../modal-layout/modal-layout';
import { type Member } from '../../types/U';
import { ProjectService } from '../../services/project-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-members',
  imports: [ModalLayout, DatePipe],
  templateUrl: './members.html',
  styles: ``,
})
export class Members {
  isModalOpen = signal(false);
  projectId = input.required<string>();
  members = signal<Member[]>([]);
  private projectService = inject(ProjectService);

  openModal() {
    this.isModalOpen.set(true);
    this.projectService.getMembersByProject(this.projectId()).subscribe({
      next: (data) => {
        this.members.set(data);
      },
      error: (error) => {
        console.error('Error fetching members', error);
      },
    });
  }
}
